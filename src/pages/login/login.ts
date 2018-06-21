import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  t0: any;
  
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string, t0: string} = {
    email: 'admin@admin.com',
    password: 'admin',
    t0: 'NOK'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public restProvider: RestProvider) {

    // Get t0 and send it to hidden input field
    this.getT0();

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Obtain a token0 for the 2 steps login through the TIS rest service
  getT0() {
    this.restProvider.getT0()
      .then(data => {
        this.t0 = data;
        console.log(this.t0);

        // Send t0 to hidden input field
        if (this.t0.status == "OK") {
          this.account.t0 = this.t0.t0;
        }     
      });
  }

  // Attempt to login in through the the TIS rest service
  doLogin() { /*
    this.restProvider.getT0()
      .then(data => {
        this.t0 = data;
        console.log(this.t0);

        // Send t0 to hidden input field
        if (this.t0.status == "OK") {
          this.account.t0 = this.t0.t0;
        }     
      });  */

    this.restProvider.login(this.account)
    .then((res) => {
      console.log(this.res);
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  // Attempt to login in through the User service
  doLoginX() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
