import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoalItem } from '../../models/goalItem/goalItem';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the DoneServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoneServiceProvider {

  userId: any;
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
  getDoneItems(){
    if(!this.userId) return;
    return this.db.list<GoalItem>('goals/done/'+ this.userId+'/');
  }

   addDoneItem(GoalItem){
    return this.db.list<GoalItem>('goals/done/'+ this.userId+'/').push({
      name : GoalItem.name,
      description : GoalItem.description,
      startDate : GoalItem.startDate,
      endDate : GoalItem.endDate,
      color:GoalItem.color,
      userId : this.userId
    });
  }

  remouveDoneItem(id){
    return this.db.list<GoalItem>('goals/done/'+ this.userId+'/').remove(id);
  }

  updateDoneItem(id){
    
  }

}
