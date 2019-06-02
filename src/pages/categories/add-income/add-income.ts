import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { IncomesItem } from '../../../models/icomesItem/incomesItem-interface';
import { IncomesServiceProvider } from '../../../providers/incomes-service/incomes-service';


import { AnimationBuilder, AnimationService } from 'css-animator';

@IonicPage()
@Component({
  selector: 'page-add-income',
  templateUrl: 'add-income.html',
})
export class AddIncomePage {

  incomeItem = {} as IncomesItem;
  
  @ViewChild("dollar") dollar;
  private animator: AnimationBuilder;
  
  
  constructor(public navCtrl: NavController,
    public incomespro : IncomesServiceProvider,
    animationService: AnimationService,
    private toastCntr : ToastController
    ) {
      this.animator = animationService.builder();
      this.incomeItem.color = "#000000";
    }
  public addIncomeItem(incomeItem){
    this.incomespro.addItem(incomeItem).then(()=>{
      this.navCtrl.setRoot('CategoriesPage').then(()=>{
        this.toastCntr.create({
          message : "Added successfully",
          duration : 3000
        }).present();
      })
    })
    this.incomeItem = {} as IncomesItem;
    this.navCtrl.pop();
    this.animateElem();
  }

  public animateElem() {
    this.animator.setType('ZoomOutDown').setDuration(10).show(this.dollar.nativeElement);
  }
}
