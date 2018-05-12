import { Component } from '@angular/core';
import { ExpensesServiceProvider } from '../../providers/expenses-service/expenses-service';
import { IncomesServiceProvider } from '../../providers/incomes-service/incomes-service';
import { IncomesItem } from '../../models/icomesItem/incomesItem-interface';
import { NavController, ViewController, Item, NavParams, ToastController } from 'ionic-angular';


@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  incomesItem = {} as IncomesItem;
  type:String;
  constructor(
    public incomespro: IncomesServiceProvider,
    public expensesPro: ExpensesServiceProvider,
    public navCtrl: NavController,
    public viewCtrl : ViewController,
    public navParams : NavParams,
    public toastCntr :ToastController
  ) {
  }
  ionViewDidLoad(){
    this.incomesItem=this.navParams.get('item');
   
  }
  remouveItem(incomesItem) {
     if(this.type == "incomes"){
       this.incomespro.remouveItem(this.incomesItem).then(()=>{
        this.viewCtrl.dismiss();
      }).then(()=>{
        this.toastCntr.create({
          message : "Deleted successfully",
          duration : 3000
        }).present();
      
      }) 
    }else{
      this.expensesPro.remouveItem(this.incomesItem).then(()=>{
        this.viewCtrl.dismiss();
      }).then(()=>{
        this.toastCntr.create({
          message : "Deleted successfully",
          duration : 3000
        }).present();
      
      })
    } 
    
  }
  toEditPage(incomesItem ) {
    if(this.type == "incomes"){
      this.navCtrl.push('EditIncomesPage',{incomesItem :this.incomesItem} );
    }else{
      this.navCtrl.push('EditExpensesPage',{incomesItem :this.incomesItem} );
    }
    this.viewCtrl.dismiss();
  }
}
