import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { from } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { Config } from '../model/Config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [ServiceService]
})
export class RegisterPage implements OnInit {

  public isCorrect:boolean;

  constructor(private serve:ServiceService, private navCtrl: NavController) {
    this.isCorrect = true;
   }

  ngOnInit() {
  }

  public register(form) {
   

    if(form.controls.contraseña === form.controls.confirmar) {
      this.isCorrect = true;
      this.sendUser(form)
    } else {
      this.isCorrect = false;
    }

    
  }

  public sendUser(form) {
    var user = new Usuario();
      user.nombre = form.controls.nombre;
      user.correo = form.controls.correo;
      user.contraseña =  form.controls.contraseña;
      console.log(user);

      this.serve.saveUser(Config.getInstance().getUrl+"saveUser",user).subscribe(
        res => {
          if(res) {
            this.navCtrl.navigateForward("/home");
          }else {
            
          }
        },
        error => console.log("error")
        
      );

  }

  
  

}
