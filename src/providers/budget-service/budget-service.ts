
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BudgetItem } from '../../models/budgetItem/budgetItem.interface';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class BudgetServiceProvider {

  userId: any;
 // private budgetListRef = this.db.list<BudgetItem>('${this.userId}/budget-list');
    
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
    getBudgetItems(){
      if(!this.userId) return;
      return this.db.list<BudgetItem>('/budgets/'+this.userId+'/');
    }

    addItem(budgetItem){
    
      return this.db.list<BudgetItem>('/budgets/'+this.userId+'/').push({
        name : budgetItem.name,
        amount : Number(budgetItem.amount),
        color : budgetItem.color,
        userId : this.userId
      });
    }

    remouveItem(id){
      return this.db.list<BudgetItem>('/budgets/'+this.userId+'/').remove(id);
    }

  }


