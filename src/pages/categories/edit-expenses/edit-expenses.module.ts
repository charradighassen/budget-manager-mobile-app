import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditExpensesPage } from './edit-expenses';

@NgModule({
  declarations: [
    EditExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditExpensesPage),
  ],
})
export class EditExpensesPageModule {}
