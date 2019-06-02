import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Slides, IonicPage, PopoverController, NavParams } from 'ionic-angular';
import { IncomesServiceProvider } from '../../providers/incomes-service/incomes-service';
import { ExpensesServiceProvider } from '../../providers/expenses-service/expenses-service';
import { IncomesItem } from '../../models/icomesItem/incomesItem-interface';
import { ExpensesItem } from '../../models/exspensesItem/exspensesItem-interface';

import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { AnimationBuilder, AnimationService } from 'css-animator';
import { PopoverComponent } from '../../components/popover/popover';




@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {


  @ViewChild('mySlider') slider: Slides;
  @ViewChild('myElement') myElem;
  selectedSegment: string;
  slides: any;

  incomesListRef: Observable<any[]> = null;
  incomeItem = {} as IncomesItem;
  expensesListRef: Observable<ExpensesItem[]> = null;
  expensesItem = {} as ExpensesItem;
  type: String;
  arr = [] as Number[];
  arrColor = [] as string[];

  private animator: AnimationBuilder;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public incomespro: IncomesServiceProvider,
    public expensesPro: ExpensesServiceProvider,
    public renderer: Renderer,
    animationService: AnimationService,
    public popoverCtrl: PopoverController,

  ) {
    this.animator = animationService.builder();

    if (this.incomespro.getIncomeItems()) {
      this.incomesListRef = this.incomespro.getIncomeItems()
        .snapshotChanges()
        .map(
          changes => {
            return changes
              .map(c => ({
                key: c.payload.key, ...c.payload.val(),
              }))
          });
          this.incomespro.getIncomeItems().valueChanges().subscribe(data => {
            this.arr = [] as Number[];
            this.arrColor = [] as string[];
            data.forEach(d => {
    
              this.arr.push(d.amount);
              this.arrColor.push(d.color);
            })
            this.createChart(this.arr, "incomes", this.arrColor);
          })
    }

    if (this.expensesPro.getExpensesItems()) {
      this.expensesListRef = this.expensesPro.getExpensesItems()
        .snapshotChanges()
        .map(
          changes => {
            return changes.map(c => ({
              key: c.payload.key, ...c.payload.val()
            }))
          });

          this.expensesPro.getExpensesItems().valueChanges().subscribe(data => {
            this.arr = [] as Number[];
            this.arrColor = [] as string[];
            data.forEach(d => {
              this.arr.push(d.amount);
              this.arrColor.push(d.color);
            })
                  this.createChart(this.arr, "expenses", this.arrColor);
          })
    }



    this.selectedSegment = 'incomes';
    this.slides = [
      {
        id: "incomes",
        list: this.incomesListRef,
        color:"primary"
      },
      {
        id: "expenses",
        list: this.expensesListRef,
        color:"danger"
      }
    ];
  }

  public viewDidLoad(){
    if (this.incomespro.getIncomeItems()) {
          this.incomespro.getIncomeItems().valueChanges().subscribe(data => {
            this.arr = [] as Number[];
            this.arrColor = [] as string[];
            data.forEach(d => {
    
              this.arr.push(d.amount);
              this.arrColor.push(d.color);
            })
            this.createChart(this.arr, "incomes", this.arrColor);
          })
    }


  }
  public createChart(arr, id, arrcolor) {
    new Chart(document.getElementsByClassName(id), {
      type: 'doughnut',
      data: {
        datasets: [
          {
            backgroundColor: arrcolor,
            data: arr
          }
        ]
      }

    });
  }


  presentPopover(myEvent, item) {
    this.type = 'incomes';
    let popover = this.popoverCtrl.create(PopoverComponent, { item: item });
    popover.present({
      ev: myEvent
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
    this.viewDidLoad();
  }

  public toAddIncome() {
    this.navCtrl.push('AddIncomePage');
  }
  public toAddExpenses() {
    this.navCtrl.push('AddExpensesPage');
  }
  public animateElem() {
    this.animator.setType('flipInX').setDuration(4).show(this.myElem.nativeElement);
  }
}
