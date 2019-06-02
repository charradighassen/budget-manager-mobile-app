import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailGoalPage } from './detail-goal';

@NgModule({
  declarations: [
    DetailGoalPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailGoalPage),
  ],
})
export class DetailGoalPageModule {}
