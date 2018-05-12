
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class DataServiceProvider {

  userId: any;
  constructor(public db:AngularFireDatabase,private afAuth: AngularFireAuth,private http :Http) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }
  getMenus(){
    return this.http.get('../../assets/data/menu.json')
     .map((response:Response)=>response.json());
  }
}
