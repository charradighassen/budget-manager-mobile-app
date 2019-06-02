import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoalItem } from '../../models/goalItem/goalItem';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ToDoServiceProvider {

  

  userId: any;
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
  getToDoItems(){
    if(!this.userId) return;
    return this.db.list<GoalItem>('goals/todo/'+ this.userId+'/');
  }

   addToDoItem(GoalItem){
    return this.db.list<GoalItem>('goals/todo/'+ this.userId+'/').push({
      name : GoalItem.name,
      description : GoalItem.description,
      startDate : GoalItem.startDate,
      endDate : GoalItem.endDate,
      color:GoalItem.color,
      userId : this.userId
    });
  }

  remouveToDoItem(id){
    return this.db.list<GoalItem>('goals/todo/'+ this.userId+'/').remove(id);
  }

  updatetoDoItem(id){
    
  }

}
