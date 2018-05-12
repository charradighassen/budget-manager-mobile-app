import { Component } from '@angular/core';
import {ActionSheetController, AlertController,  IonicPage,   NavController,   NavParams, } from 'ionic-angular';

import { BudgetItem } from '../../models/budgetItem/budgetItem.interface';
import { BudgetServiceProvider } from '../../providers/budget-service/budget-service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {


  budgetListRef: Observable<BudgetItem[]>;
  budgetItem= {}as BudgetItem;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private actionSheetCtrl: ActionSheetController,
    public budgetprovider:BudgetServiceProvider
  ) {
   this.budgetListRef = this.budgetprovider.getBudgetItems()
   .snapshotChanges()
   .map(
     changes => {
       return changes.map(c => ({
         key: c.payload.key, ...c.payload.val()
       }))
     });
  }

  addItem(){
    this.budgetprovider.addItem(this.budgetItem);
  }

   remouveItem(id){
    this.budgetprovider.remouveItem(id);
  }
  toaddpage(){
    this.navCtrl.push('BudgetAddPage');
  }
  toEditPage(item:BudgetItem){
    this.navCtrl.setRoot('BudgetEditPage',{edititem:item});
  }
}
