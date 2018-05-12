import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    rootPage = 'MenuPage';
    @ViewChild('mySlider') slider: Slides;
    selectedSegment: string;
    slides: any;
  constructor(public navCtrl: NavController) {

    this.selectedSegment = 'incomes';
    
    this.slides = [
      {
        id: "incomes",
        title: "incomes Slide",
        content: 'incomes content'
      },
      {
        id: "expenses",
        title: "expenses Slide",
        content: 'expenses content'
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
}
