import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetEditPage } from './budget-edit';

@NgModule({
  declarations: [
    BudgetEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetEditPage),
  ],
})
export class BudgetEditPageModule {}
