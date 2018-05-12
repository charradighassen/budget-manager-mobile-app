import { Component } from '@angular/core';
import {IonicPage, NavController,  NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public person: {userName: string, email: string, birthdate?: number,imgUrl:String};
  dob: any;
  age: any;
  imgUrl:string;
  showProfile: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = {userName: undefined, email: undefined, birthdate: undefined,
      imgUrl :"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
    };

    

    this.dob = undefined;
  }
  ionViewDidLoad() {
    let person = JSON.parse(localStorage.getItem('PERSON'));
    if (person){
      this.person = person;
      this.age = this.getAge(this.person.birthdate);
      this.dob = new Date(this.person.birthdate).toISOString();
    }
  }

  cancel(){
    this.person = {userName:null,email: null, birthdate: null, imgUrl: null};
    this.dob = null;
    this.showProfile = false;
    this.navCtrl.pop();
  }

  save(){
    this.person.birthdate = new Date(this.dob).getTime();
    this.age = this.getAge(this.person.birthdate);
    this.showProfile = true;
    localStorage.setItem('PERSON', JSON.stringify(this.person));
    this.navCtrl.pop();
  }

  getAge(birthdate){
    let currentTime = new Date().getTime();
     return ((currentTime - birthdate)/31556952000).toFixed(0);
  }

 changeimage(){
    alert('change img');
  }
}
