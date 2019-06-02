import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGoalPage } from './edit-goal';

@NgModule({
  declarations: [
    EditGoalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditGoalPage),
  ],
})
export class EditGoalPageModule {}
