import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the GoalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
})
export class GoalsPage {
  selectedSegment: string;
  
  @ViewChild('mySlider') slider: Slides;
  slides: { id: string; list: any; }[];
  color: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

 
    
  this.slides = [
    {
      id: "Done",
      list: ""

    },
    {
      id: "Doing",
      list: ""

    },
    {
      id: "ToDo",
      list: ""
    }
  ];
  }
  
 

  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    const currentSlide = this.slides[slider.getActiveIndex()];
    this.selectedSegment = currentSlide.id;
  }

  toAddPage(){
    this.navCtrl.push('addGoalPage');
  }
  toEditPage(){
    this.navCtrl.push('addGoalPage');
  }
  remouveGoal(){
    this.navCtrl.push('addGoalPage');
  }
}
