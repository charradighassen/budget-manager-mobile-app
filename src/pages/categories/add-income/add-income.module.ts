import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddIncomePage } from './add-income';

@NgModule({
  declarations: [
    AddIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(AddIncomePage),
  ],
})
export class AddIncomePageModule {}
