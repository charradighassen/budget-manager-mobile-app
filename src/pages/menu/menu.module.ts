import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
    DirectivesModule,
  ],
  exports:[
    MenuPage
  ]
  
})
export class MenuPageModule {}
