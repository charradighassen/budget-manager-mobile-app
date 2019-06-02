import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { IncomesServiceProvider } from '../../providers/incomes-service/incomes-service';
import { ExpensesServiceProvider } from '../../providers/expenses-service/expenses-service';
import { Chart } from 'chart.js';
@IonicPage()
@Component({
  selector: 'page-saving',
  templateUrl: 'saving.html',
})
export class SavingPage {


  balance: Number = -0;;
  income: number = 0;
  expenses: number = 0;
  color:string;
  constructor(public navCtrl: NavController,
    public incomespro: IncomesServiceProvider,
    public expensesPro: ExpensesServiceProvider,
  ) {}

  ionViewDidLoad() {
    this.incomespro.getIncomeItems().valueChanges()
      .map(res => res)
      .subscribe(data => {
        data.forEach(e => {
          this.income = Number(this.income) + Number(e.amount);
        })
        this.expensesPro.getExpensesItems().valueChanges().subscribe(d => {
          d.forEach(x => {
            this.expenses = Number(this.expenses) + Number(x.amount);
            this.createCharts(this.income, this.expenses);
            this.balance = this.income - this.expenses;
            if(this.balance>= 0){
              this.color = "secondary";
            }else{
              this.color = "danger";
            }
            
          })
        })

      });


  }


  public createCharts(s1: number, s2: number) {
    new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      data: {
        datasets: [
          {

            backgroundColor: ["#32db64", "#0097e6"],
            data: [s1, s2]
          }
        ]
      }

    });
  }

}
