import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { userItem } from '../../models/userItem/userItem';
import { User } from '@firebase/auth-types';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserServiceProvider {

  userId: any;
  private userInfoListRef = this.db.list<any>('/users/'+this.userId+'/');
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  addItem(item : User){
    return this.db.list<User>('/users/'+this.userId).push(item);
  }

  updateItem(item : User){
    return this.db.list<User>('/users/'+this.userId+'/').update(item.uid,item);
  }
}
