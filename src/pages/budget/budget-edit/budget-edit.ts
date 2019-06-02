import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { BudgetItem } from '../../../models/budgetItem/budgetItem.interface';
import { BudgetServiceProvider } from '../../../providers/budget-service/budget-service';



@IonicPage()
@Component({
  selector: 'page-budget-edit',
  templateUrl: 'budget-edit.html',
})
export class BudgetEditPage {

  budgetItem = {} as BudgetItem;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public budgetpro: BudgetServiceProvider,
    private toastCntr: ToastController
  ) {}
  ionViewWillLoad() {
    this.budgetItem = this.navParams.get('item');
  }
  save(budgetItem) {
    this.budgetpro.updateItem(budgetItem).then(() => {
      this.navCtrl.pop().then(() => {
        this.toastCntr.create({
          message: "Updated successfully",
          duration: 3000
        }).present();
      })
    })

  }


}
