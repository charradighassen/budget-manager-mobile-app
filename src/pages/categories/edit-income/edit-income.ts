import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IncomesItem } from '../../../models/icomesItem/incomesItem-interface';
import { IncomesServiceProvider } from '../../../providers/incomes-service/incomes-service';



@IonicPage()
@Component({
  selector: 'page-edit-income',
  templateUrl: 'edit-income.html',
})
export class EditIncomePage {

  incomeItem = {}  as IncomesItem;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private incomePro : IncomesServiceProvider,
              private toastCntr : ToastController
            
            ) {
              this.incomeItem = this.navParams.get('incomesItem');
            }

  save(incomeItem){
    this.incomePro.updateItem(this.incomeItem).then(()=>{
      this.navCtrl.pop().then(()=>{
        this.toastCntr.create({
          message : "Updated successfully",
          duration : 3000
        }).present();
      })
    })
    
  }
  ionViewWillLoad(){
    this.incomeItem = this.navParams.get('incomesItem');
    console.log('did load item ',this.incomeItem);
  }

}
