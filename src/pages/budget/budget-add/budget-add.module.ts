import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetAddPage } from './budget-add';

@NgModule({
  declarations: [
    BudgetAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetAddPage),
  ],
})
export class BudgetAddPageModule {}
