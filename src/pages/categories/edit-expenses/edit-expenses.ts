import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ExpensesItem } from '../../../models/exspensesItem/exspensesItem-interface';
import { ExpensesServiceProvider } from '../../../providers/expenses-service/expenses-service';



@IonicPage()
@Component({
  selector: 'page-edit-expenses',
  templateUrl: 'edit-expenses.html',
})
export class EditExpensesPage {
  incomeItem = {} as ExpensesItem;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private expensesPro: ExpensesServiceProvider,
    private toastCntr: ToastController
  ) { 

  }
  ionViewWillLoad(){
    this.incomeItem = this.navParams.get('incomesItem');
  }
  save(incomeItem) {
    this.expensesPro.updateItem(incomeItem).then(() => {
      this.navCtrl.pop().then(() => {
        this.toastCntr.create({
          message: "Updated successfully",
          duration: 3000
        }).present();
      })
  })
}

}
