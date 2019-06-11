import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { catchError } from 'rxjs/operators';
import { Config } from '../model/Config';
import { Publicacion } from '../model/publicacion';
import { UsuarioActual } from '../model/UsuarioActual';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
  providers: [ServiceService]
})
export class NewPostPage implements OnInit {


  titulo: string;
  fecha: Date;
  //url_img: string;
  descripcion: string;
  longitud: number;
  latitud: number;
  usuario: "user";
  imageData: any;


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private camera: Camera,
    public alertController: AlertController, public toastController: ToastController, private file: File, private http: HttpClient,
    private readonly loadingCtrl: LoadingController, private serve: ServiceService) {
    this.fecha = new Date();
    this.titulo = " dadas das d asd asd";
    this.descripcion = "dadasdas das das d as d asd as d asd";
    this.latitud = 0;
    this.longitud = 0;
    //this.url_img = "none"
  }

  ngOnInit() {
    this.geolocationNative();
  }

  public geolocationNative() {
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

  selectPhoto(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageData = imageData;
      this.url_img = '';
      this.url_img = 'data:image/png;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  startCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageData = imageData;
      this.url_img = '';
      this.url_img = 'data:image/png;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  public async sendData() {
    if (await this.verifyData()) {
      this.presentToast('Datos Correctos');
      this.savePost();
      this.uploadImage(UsuarioActual.getInstance()._id + this.titulo + ".png");

    }
  }

  public savePost() {
    var post = new Publicacion();
    post.descripcion = this.descripcion;
    post.fecha = this.fecha;
    post.id_usuario = UsuarioActual.getInstance()._id;
    post.latitud = this.latitud;
    post.longitud = this.longitud;
    post.nombre_usuario = UsuarioActual.getInstance().nombre;
    post.titulo = this.titulo;
    post.url_img = UsuarioActual.getInstance()._id + this.titulo + ".png";
    console.log(post);

    this.serve.savePost(Config.getInstance().getUrl() + "/savePost", post).subscribe(
      res => { },
      error => console.log("errro  " + error)

    );
  }

  public uploadImage(nameImg: string) {
    this.serve.getImg(Config.getInstance().getUrl() + "/saveImg",this.url_img, nameImg).subscribe(
      res => {
        this.presentToast("exito");
        this.navCtrl.navigateForward("/home");
      },
      (error: any) => (this.presentToast("error"))
    );
  }

  public async verifyData() {
    if ((this.titulo === undefined)) {
      await this.presentAlert("Ingrese el  titulo del problema");
      return false;
    } else {
      if ((this.titulo.length < 1)) {
        await this.presentAlert("el titulo  debe tener minimo 1 caracteres");
        return false;
      }
    }

    if ((this.descripcion === undefined)) {
      await this.presentAlert("No hay descripcion del problema");
      return false;
    } else {
      if ((this.descripcion.length < 20)) {
        await this.presentAlert("la descripcion debe tener minimo 20 caracteres");
        return false;
      }
    }

    if (this.url_img === 'none') {
      await this.presentAlert("Suba una imagen por favor");
      return false;
    }
    return true;

  }



  async presentAlert(text: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Aviso',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  public url_img = "data:image/png;base64,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"

}
