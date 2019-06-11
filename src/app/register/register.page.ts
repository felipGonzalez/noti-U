import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { from } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { Config } from '../model/Config';
import { NavController } from '@ionic/angular';
import { UsuarioActual } from '../model/UsuarioActual';

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
    if(form.controls.contraseña.value === form.controls.confirmar.value) {
      this.isCorrect = true;
      this.sendUser(form)
    } else {
      this.isCorrect = false;
    }

    
  }

  public sendUser(form) {
    var user = new Usuario();
      user.nombre = form.controls.nombre.value;
      user.correo = form.controls.correo.value;
      user.contraseña =  form.controls.contraseña.value;
      console.log((Config.getInstance().getUrl()+"/saveUser"));
      
      this.serve.saveUser(Config.getInstance().getUrl()+"/saveUser",user).subscribe(
          res => {
          console.log(res.ops);
          var aux = res.ops[0];
          if(res !== null) {
            UsuarioActual.getInstance()._id = aux._id;
            UsuarioActual.getInstance().nombre = aux.nombre;
            UsuarioActual.getInstance().correo = aux.correo;
            UsuarioActual.getInstance().contraseña = aux.contraseña;
            this.navCtrl.navigateForward("/home");
            
          }else {

          }
        },
        error => console.log("error  "+ error)
        
      );

  }

  
  

}
