import { Directive,Input, ElementRef, Renderer } from '@angular/core';
import { Header } from 'ionic-angular';


@Directive({
  selector: '[hide-header]',
  host:{ 
    '(ionScroll)':'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input("header") header:HTMLElement;
  headerheight;

  constructor(public element:ElementRef,public renderer:Renderer) {
    
  }

  ngOnInit(){
    this.headerheight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header,'webkitTransition','top 700ms');
  }

  onContentScroll(event){
    if(event.scrollTop > 56){
      this.renderer.setElementStyle(this.header,'top','-56px');
    }else{
      this.renderer.setElementStyle(this.header,'top','0px');
    };
  }
}
