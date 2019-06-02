import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GoalItem } from '../../../models/goalItem/goalItem';
import { ToDoServiceProvider } from '../../../providers/to-do-service/to-do-service';
import { DoingServiceProvider } from '../../../providers/doing-service/doing-service';
import { DoneServiceProvider } from '../../../providers/done-service/done-service';

/**
 * Generated class for the AddGoalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-goal',
  templateUrl: 'add-goal.html',
})
export class AddGoalPage {

  goal = {} as GoalItem;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toDoService: ToDoServiceProvider,
    private doingService: DoingServiceProvider,
    private doneService: DoneServiceProvider,
    private toastCtrl: ToastController
  ) {


  }



  addToDoGoal(goal) {
    this.toDoService.addToDoItem(goal).then(() => {
      this.navCtrl.pop();

    }).then(() => {
      this.toastCtrl.create({
        message: "Added Successfully",
        duration: 3000
      })
    })
  }



}
