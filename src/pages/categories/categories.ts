import { Component, ViewChild,  Renderer } from '@angular/core';
import { NavController, Slides, IonicPage, PopoverController, NavParams } from 'ionic-angular';
import { IncomesServiceProvider } from '../../providers/incomes-service/incomes-service';
import { ExpensesServiceProvider } from '../../providers/expenses-service/expenses-service';
import { IncomesItem } from '../../models/icomesItem/incomesItem-interface';
import { ExpensesItem } from '../../models/exspensesItem/exspensesItem-interface';

import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { AnimationBuilder, AnimationService } from 'css-animator';
import { PopoverComponent } from '../../components/popover/popover';
import { Change } from '@firebase/database/dist/esm/src/core/view/Change';
import { AngularFireAuth } from 'angularfire2/auth';
@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {


  chartData: any;
  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  incomesListRef: Observable<any[]> = null;
  incomeItem = {} as IncomesItem;
  expensesListRef: Observable<ExpensesItem[]> =null;
  expensesItem = {} as ExpensesItem;

  i: number = 0;
  amount: Number[];
  exp = [];
  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;
  type:String;
  userId:any;
  constructor(public navCtrl: NavController,
    public navParams:NavParams,
    public incomespro: IncomesServiceProvider,
    public expensesPro: ExpensesServiceProvider,
    public renderer: Renderer,
    animationService: AnimationService,
    public popoverCtrl: PopoverController,
    private afAuth: AngularFireAuth

  ) {
    this.animator = animationService.builder();
    if(this.incomespro.getIncomeItems()){
      this.incomesListRef = this.incomespro.getIncomeItems()
      .snapshotChanges()
      .map(
        changes => {
        this.createIncomeChart(changes)
          return changes
          .map(c => ({
            key: c.payload.key, ...c.payload.val(),
          }))
        });
    }
   
    if(this.expensesPro.getExpensesItems()){
      this.expensesListRef = this.expensesPro.getExpensesItems()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });
    }
    


    this.selectedSegment = 'incomes';
    this.slides = [
      {
        id: "incomes",
        list: this.incomesListRef,

      },
      {
        id: "expenses",
        list: this.expensesListRef
      }
    ];

  }
  ionViewDidLoad(){

   
  }
  
  presentPopover(myEvent,item) {
    this.type='incomes';
    let popover = this.popoverCtrl.create(PopoverComponent,{item:item });
    popover.present({
      ev: myEvent
    });
  }




  public animateElem() {
    this.animator.setType('flipInX').setDuration(4).show(this.myElem.nativeElement);
  }




  public createIncomeChart(data) {
    this.chartData = data;
    new Chart(document.getElementById("doughnutsIncome-chart"), {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: ["#004568", "#00ff00", "#005566"],
            data: [250, 1000, 250]
          }
        ]
      }

    });
  }


  public createExpensesChart(data) {
    new Chart(document.getElementById("doughnutsExpenses-chart"), {
      type: 'doughnut',
      data: {
        labels: ["car", "house", "income2"],
        datasets: [
          {
            backgroundColor: ["#ff0000", "#00ff00", "#0000ff"],
            data: [14785, 12547, 14587]
          }
        ]
      }

    });
  }
  
  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    const currentSlide = this.slides[slider.getActiveIndex()];
    this.selectedSegment = currentSlide.id;
  }

  public toAddIncome() {
    this.navCtrl.push('AddIncomePage');
  }
  public toAddExpenses() {
    this.navCtrl.push('AddExpensesPage');
  }

}
