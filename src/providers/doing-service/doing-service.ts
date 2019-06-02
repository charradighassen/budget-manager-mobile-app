import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoalItem } from '../../models/goalItem/goalItem';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DoingServiceProvider {

 
  userId: any;
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
  getDoingItems(){
    if(!this.userId) return;
    return this.db.list<GoalItem>('goals/doing/'+ this.userId+'/');
  }

   addDoingItem(GoalItem){
    return this.db.list<GoalItem>('goals/doing/'+ this.userId+'/').push({
      name : GoalItem.name,
      description : GoalItem.description,
      startDate : GoalItem.startDate,
      endDate : GoalItem.endDate,
      color:GoalItem.color,
      userId : this.userId
    });
  }

  remouveDoingItem(id){
    return this.db.list<GoalItem>('goals/doing/'+ this.userId+'/').remove(id);
  }

  updateDoingItem(id){
    
  }

}
