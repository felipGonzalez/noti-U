import { Component, OnInit } from '@angular/core';
import { Config } from '../model/Config';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
 
  public port;
  public ip;

  constructor( public toastController: ToastController) {
    this.port = Config.getInstance().getPort();
    this.ip = Config.getInstance().getIp();
  }

  ngOnInit() {
  }

  public actuallyData() {
    Config.getInstance().setIp(this.ip);
    Config.getInstance().setPort(this.port);
    this.presentToast("Datos actualizados");
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
 
}
