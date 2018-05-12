
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ExpensesItem } from '../../models/exspensesItem/exspensesItem-interface';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ExpensesServiceProvider {

  userId: any;
 // private expensesListRef = this.db.list<ExpensesItem>('${this.userId}/expenses-list');
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  getExpensesItems(){
    if(!this.userId) return;
    return this.db.list<ExpensesItem>('/exspenses-list/'+this.userId+'/');
  }

   addItem(item :ExpensesItem){
    return this.db.list<ExpensesItem>('/exspenses-list/'+this.userId+'/').push({
      name : item.name,
      amount : Number(item.amount),
      color:item.color===null?"#000":item.color,
      userId : this.userId
    });
  }

  remouveItem(item :ExpensesItem){
    return this.db.list<ExpensesItem>('/exspenses-list/'+this.userId+'/').remove(item.key);
  }
  updateItem(item : ExpensesItem){
    return this.db.list<ExpensesItem>('/exspenses-list/'+this.userId+'/').update(item.key,item);
  }
}
