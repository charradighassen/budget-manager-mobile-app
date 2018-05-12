
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BudgetItem } from '../../../models/budgetItem/budgetItem.interface';
import { BudgetServiceProvider } from '../../../providers/budget-service/budget-service';



@IonicPage()
@Component({
  selector: 'page-budget-edit',
  templateUrl: 'budget-edit.html',
})
export class BudgetEditPage {

  budgetItem= {}as BudgetItem;
  constructor(public navCtrl: NavController,
              public budgetpro:BudgetServiceProvider
            ) {

  }

  

}
