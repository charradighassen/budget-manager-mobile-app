import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProfilePage } from './profile/profile';




@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }

  public dismiss() {
    this.navCtrl.pop();
  }
  toprofile(){
    this.navCtrl.push('ProfilePage');
  }
  tocurrencies(){
    this.navCtrl.push('CurrenciesPage');
  }
}
