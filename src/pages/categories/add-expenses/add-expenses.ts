import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ExpensesItem } from '../../../models/exspensesItem/exspensesItem-interface';
import { ExpensesServiceProvider } from '../../../providers/expenses-service/expenses-service';

@IonicPage()
@Component({
  selector: 'page-add-expenses',
  templateUrl: 'add-expenses.html',
})
export class AddExpensesPage {

  expensesItem = {} as ExpensesItem;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public expensepro: ExpensesServiceProvider
    , private toastCntr: ToastController
  ) {

  }

  addExpensesItem(expensesItem) {
    this.expensepro.addItem(this.expensesItem).then(() => {
      
        this.toastCntr.create({
          message: "Added successfully",
          duration: 3000
        }).present();
      })
    
    this.expensesItem = {} as ExpensesItem;

    this.navCtrl.pop();
  }

}
