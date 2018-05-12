import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { } from '../../providers/incomes-service'
import { AngularFireDatabase } from 'angularfire2/database';
import { IncomesItem } from '../../models/icomesItem/incomesItem-interface';
import { ExpensesItem } from '../../models/exspensesItem/exspensesItem-interface';
import { IncomesServiceProvider } from '../../providers/incomes-service/incomes-service';
import { ExpensesServiceProvider } from '../../providers/expenses-service/expenses-service';
import { Observable } from 'rxjs/Observable';

import { Chart } from 'chart.js';
@IonicPage()
@Component({
  selector: 'page-saving',
  templateUrl: 'saving.html',
})
export class SavingPage {


  balance:number=0;  ;
  income:number=1500;
  expenses:number=1500;
  ref: Observable<IncomesItem[]>;
public somme:Number=0;
private arr = [ ];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public incomespro: IncomesServiceProvider,
    public expensesPro: ExpensesServiceProvider,
    public toastCtrl: ToastController) {

      this.incomespro.getIncomeItems().valueChanges()
      .map(res => res)
      .subscribe(data =>{
        data.forEach(e =>{
          
          this.somme = Number(this.somme) + Number(e.amount);
          this.arr.push(e);
        })
        
      });
     console.log(this.arr.slice());
      
      
  }

  ionViewDidLoad() {
     this.incomespro.getIncomeItems().valueChanges().subscribe(resulat=>{
    this.createCharts(resulat);
     });
     
  }


  public createCharts(d) {
    new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      data: {
        datasets: [
          {
            
            backgroundColor: ["#32db64", "#0097e6"],
            data:[1000,1000]
          }
        ]
      }
      
  });
  }

}
