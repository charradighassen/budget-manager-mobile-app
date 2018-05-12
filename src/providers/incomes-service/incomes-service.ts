
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { IncomesItem } from '../../models/icomesItem/incomesItem-interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from '@mobiscroll/angular/src/js/frameworks/angular';

@Injectable()
export class IncomesServiceProvider {
  userId: string;
  //private incomesListRef = this.db.list<IncomesItem>('/items/${this.userId}/incomes-list');
  incomesListRef : Observable<IncomesItem[]>;
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
  
  getIncomeItems(){
    if(!this.userId) return;
    return this.db.list<IncomesItem>('/incomes-list/'+this.userId+'/');
  }

  addItem(item : IncomesItem){
    return this.db.list<IncomesItem>('/incomes-list/'+this.userId+'/').push({
      name : item.name,
      amount : Number(item.amount),
      color : item.color==null?"#000":item.color,
      userId : this.userId
    });
  }

  remouveItem(item : IncomesItem){
    console.log(item.key)
    return this.db.list<IncomesItem>('/incomes-list/'+this.userId+'/').remove(item.key);
  }
  updateItem(item : IncomesItem){
    return this.db.list<IncomesItem>('/incomes-list/'+this.userId+'/').update(item.key,item);
  }
}
