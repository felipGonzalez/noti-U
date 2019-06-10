import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})



export class ViewPostPage implements OnInit {

  @Input()  titulo: string;
  @Input()  fecha: string;
  @Input()  url_img: string;
  @Input()  descripcion: string; 
  @Input()  longitud: number;
  @Input()  latitud: number;
  @Input() usuario: string;
  


  constructor(navParams: NavParams, public modalController: ModalController) {

   }

  ngOnInit() {
  }

  public closeModal() {
    this.url_img = "";
    this.modalController.dismiss();
    }



}
