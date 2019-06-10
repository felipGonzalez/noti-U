import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Config } from '../model/Config';
import { NavController } from '@ionic/angular';

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
    this.isLogin = false;

    this.serve.verifyUser(form.controls.email.value,form.controls.password.value,Config.getInstance().getUrl()+'/verifyUser').subscribe(
      res => {
        console.log(res)
        if(res === true) {
          this.navCtrl.navigateForward("/home");
          
        }else {
          this.isLogin = false;
        }
      }
      
    );
  }

 

}
