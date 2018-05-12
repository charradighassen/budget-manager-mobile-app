import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MbscSelectOptions } from '@mobiscroll/angular-trial';


@IonicPage()
@Component({
  selector: 'page-currencies',
  templateUrl: 'currencies.html',
})
export class CurrenciesPage {
   currency:any ; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrenciesPage');
  }
 
}
