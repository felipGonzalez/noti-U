import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {


  titulo: string;
  fecha: Date;
  url_img: string;
  descripcion: string;
  longitud: number;
  latitud: number;
  usuario: "user";
  imageData: any;


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private camera: Camera,
    public alertController: AlertController,public toastController: ToastController,private file: File,private http: HttpClient,
    private readonly loadingCtrl: LoadingController) {
    this.fecha = new Date();
    this.url_img = "none"
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

  public te() {
    console.log("evento");
  }

  selectPhoto(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
   };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageData = imageData;
      this.url_img = '';
      this.url_img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
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
      this.imageData = imageData;
      this.url_img = '';
      this.url_img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }









  public async sendData() {
      
    if(await this.verifyData()) {
      this.presentToast('Datos Correctos');
      this.uploadImage();
    }

  }

  public uploadImage() {
    let postData = new  FormData();
    postData.append('img', this.url_img, 'prueba.jpg')
    let data: Observable<any> = this.http.post("http://192.168.0.2:402/one", postData);
    data.subscribe(res => {
      this.presentToast('Imagen enviada');
    });
  }

    public async verifyData(){

    
    if( (this.titulo === undefined) ) {
      await this.presentAlert("Ingrese el  titulo del problema");
      return false;
    }else {
      if( (this.titulo.length < 1)) {
        await this.presentAlert("el titulo  debe tener minimo 1 caracteres");
        return false;
      }
    }

    if((this.descripcion === undefined)) {
      await this.presentAlert("No hay descripcion del problema");
      return false;
    }else {
      if( (this.descripcion.length < 20)) {
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



  async presentAlert(text:string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Aviso',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(text:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
