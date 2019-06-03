import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ServiceService } from '../services/service.service';
import { Publicacion } from '../model/publicacion';
import { UserPublic } from '../model/UserPublic';
import { Config } from '../model/Config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ServiceService, Config]
})
export class HomePage implements OnInit {

  imagePath = [];
  latitud: number;
  longitud: number;
  listPublic : Array<Publicacion>;
  listUserPublic : Array<UserPublic>;
  isOk: boolean;

  constructor(private geolocation: Geolocation, private camera: Camera, private file: File, private serve:ServiceService,
    private config: Config) {
      this.isOk = false;

  }

  ngOnInit(): void {
    this.loadPublic();
    this.loadUserPublic();
  }

  geolocationNative() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(geoposition);
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  startCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true

    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagePath.push('data:image/jpeg;base64,' + imageData);

    }, (err) => {
      // Handle error
    });


  }


  public loadPublic() {
    this.serve.getPublic(this.config.getUrl()+'/public').subscribe(
      res => {
       this.listPublic = res;
       console.log(this.listPublic);
       
      },
      (error: any) => (this.listPublic = [])
    );
  }

  public loadUserPublic() {
    this.serve.getPublicUser(this.config.getUrl()+'/userPublic').subscribe(
      res => {
       this.listUserPublic = res;
       console.log(this.listUserPublic);
       this.isOk = true;
      },
      (error: any) => (this.listUserPublic = [])
    );
  }

  getUrl(img) {
    return this.config.getUrl()+"/img"+img;
  }



}
