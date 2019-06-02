import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ToDoServiceProvider } from '../../providers/to-do-service/to-do-service';
import { DoingServiceProvider } from '../../providers/doing-service/doing-service';
import { DoneServiceProvider } from '../../providers/done-service/done-service';
import { GoalItem } from '../../models/goalItem/goalItem';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the GoalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage {
  selectedSegment: string;

  @ViewChild('mySlider') slider: Slides;
  slides: { id: string; list: any; }[];
  color: any;

  toDoList = {} as Observable<GoalItem[]>
  doingList = {} as Observable<GoalItem[]>
  doneList = {} as Observable<GoalItem[]>
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toDoService: ToDoServiceProvider,
    private doingService: DoingServiceProvider,
    private doneService: DoneServiceProvider,
  ) {

    this.toDoList = this.toDoService.getToDoItems()
      .snapshotChanges()
      .map(
        changes => {
          return changes
            .map(c => ({
              key: c.payload.key, ...c.payload.val(),

            }))
        });

    if (this.doingService.getDoingItems()) {
      this.doingList = this.doingService.getDoingItems()
        .snapshotChanges()
        .map(
          changes => {
            return changes
              .map(c => ({
                key: c.payload.key, ...c.payload.val(),
              }))
          });
    }
    if (this.doneService.getDoneItems()) {
      this.doneList = this.doneService.getDoneItems()
        .snapshotChanges()
        .map(
          changes => {
            return changes
              .map(c => ({
                key: c.payload.key, ...c.payload.val(),
              }))
          });
    }
    this.selectedSegment = "ToDo";
    this.slides = [
      {
        id: "Done",
        list: this.doneList

      },
      {
        id: "Doing",
        list: this.doingList

      },
      {
        id: "ToDo",
        list: this.toDoList
      }
    ];
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

  toAddPage() {
    this.navCtrl.push('AddGoalPage');
  }
  toEditPage() {
    this.navCtrl.push('addGoalPage');
  }
  remouveGoal() {
    this.navCtrl.push('addGoalPage');
  }
}
