
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { GoalItem } from '../../models/goalItem/goalItem';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class GoalServiceProvider {


  userId: any;
  private GoalItemRef = this.db.list<GoalItem>('${this.userId}/goals-list');
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
  getGoalsItems(){
    if(!this.userId) return;
    return this.GoalItemRef;
  }

   addItem(GoalItem){
    return this.GoalItemRef.push({
      name : GoalItem.name,
      description : GoalItem.description,
      date : GoalItem.date,
      color:GoalItem.color,
      userId : this.userId
    });
  }

  remouveItem(id){
    return this.GoalItemRef.remove(id);
  }

}
