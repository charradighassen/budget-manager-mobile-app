
import { Component } from '@angular/core';
import { IonicPage, NavController,  } from 'ionic-angular';

import { BudgetItem } from '../../../models/budgetItem/budgetItem.interface';

import { Observable } from 'rxjs/Observable';
import { BudgetServiceProvider } from '../../../providers/budget-service/budget-service';


@IonicPage()
@Component({
  selector: 'page-budget-add',
  templateUrl: 'budget-add.html',
})
export class BudgetAddPage {

  budgetItem = {} as BudgetItem;
  budgetItemRef: Observable<BudgetItem[]>;

  constructor(public navCtrl: NavController, 
    public bs:BudgetServiceProvider) {

  }

  public addBudgetItem(budgetItem){
    this.bs.addItem(budgetItem);
    //this.budgetItem = {} as BudgetItem;
    this.navCtrl.pop();
  }
  

}
