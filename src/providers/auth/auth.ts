import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(public fireAuth:AngularFireAuth ) {}

  login(email:string,password:string){
    return this.fireAuth.auth.signInWithEmailAndPassword(email,password).then(data =>{
            console.log("some data",data);
        }).catch(error =>{
            console.log("got an error",error);
        })
  }

  signup(email:string,username:string,password:string){
    return this.fireAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  logout() {
       return this.fireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }
}
