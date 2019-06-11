import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Config } from '../model/Config';
import { NavController } from '@ionic/angular';
import { UsuarioActual } from '../model/UsuarioActual';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[ServiceService]
})
export class LoginPage implements OnInit {

  public isLogin:boolean;
  
  constructor(private serve:ServiceService, private navCtrl: NavController ) {
    this.isLogin = true;
   }

  ngOnInit() {
  }


  public login(form) {
    console.log(form.controls.email.value);
    console.log(form.controls.password.value);
    this.serve.verifyUser(form.controls.email.value,form.controls.password.value,Config.getInstance().getUrl()+'/verifyUser').subscribe(
      res => {
        
        if(res !== null) {
          UsuarioActual.getInstance()._id = res._id;
          UsuarioActual.getInstance().nombre = res.nombre;
          UsuarioActual.getInstance().correo = res.correo;
          UsuarioActual.getInstance().contraseña = res.contraseña;
          this.navCtrl.navigateForward("/home");
          
        }else {
          this.isLogin = false;
        }
      }
      
    );
  }

 

}
