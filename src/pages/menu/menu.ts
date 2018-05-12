
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from "../../providers/auth/auth";
import { DataServiceProvider } from '../../providers/data-service/data-service'
import { Http } from '@angular/http';
import { AnimationService } from 'css-animator';
import { NavigationContainer } from 'ionic-angular/navigation/navigation-container';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'TabsPage';

   pages: Array<{title: string, pageName:string,component?: string,index?:any;icon : string,color:string}>; 
  constructor(public platform: Platform,
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public navctrl: NavController,
              public authpro: AuthProvider,
              
  ) {
    this.initializeApp();
     this.pages = [
      { title:'Home',    pageName:'TabsPage', component:'CategoriesPage',index: 0,icon :'md-home',        color:"primary"},
      { title:'Charts',  pageName:'ChartsPage' ,                            icon :'md-stats',             color:"secondary"},
      { title:'Goals',   pageName:'GoalsPage'                     ,index: 1,icon :'ios-locate-outline' ,  color:"danger"},
      { title:'Settings',pageName:'SettingsPage',                           icon :'md-settings' ,         color:"primary"},
      { title:'Support', pageName:'HelpPage',                               icon :'md-information-circle',color:"yel"},
      
    ]; 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  openPage(page) {
    let params = {};
    if(page.index){
      params = {
        tabIndex:page.index
      }
      if(this.nav.getActiveChildNav() &&page.index!= undefined) {
          this.nav.getActiveChildNav().select(page.index);  
      }
    }
    this.nav.setRoot(page.pageName,params);
  }

 isActive(page){
    let childNav = this.nav.getActiveChildNav();
    if(childNav){
      if(childNav.getSelected() && childNav.getSelected().root === page.component)
      return 'primary';
      }
      else{
        return page.color;
      }
        return ;

  } 
  
  logout(){
    this.authpro.logout().then(()=>{
      this.nav.push('LoginPage');
    })

    
  }
  


}
