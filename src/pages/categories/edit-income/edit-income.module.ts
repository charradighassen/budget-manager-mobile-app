import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditIncomePage } from './edit-income';

@NgModule({
  declarations: [
    EditIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(EditIncomePage),
  ],
})
export class EditIncomePageModule {}
