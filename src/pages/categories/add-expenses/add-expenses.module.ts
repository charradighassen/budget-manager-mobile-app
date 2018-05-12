import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddExpensesPage } from './add-expenses';

@NgModule({
  declarations: [
    AddExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddExpensesPage),
  ],
})
export class AddExpensesPageModule {}
