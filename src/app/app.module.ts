import { MbscModule } from '@mobiscroll/angular';
import {DirectivesModule} from '../directives/directives.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { BudgetServiceProvider } from '../providers/budget-service/budget-service';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IncomesServiceProvider } from '../providers/incomes-service/incomes-service';
import { ExpensesServiceProvider } from '../providers/expenses-service/expenses-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import{AnimationService,AnimatesDirective} from 'css-animator';
import {Facebook} from '@ionic-native/facebook';
import { PopoverComponent } from '../components/popover/popover';
import { HideHeaderDirective } from '../directives/hide-header/hide-header';
import { GoalServiceProvider } from '../providers/goal-service/goal-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ToDoServiceProvider } from '../providers/to-do-service/to-do-service';
import { DoingServiceProvider } from '../providers/doing-service/doing-service';
import { DoneServiceProvider } from '../providers/done-service/done-service';


export const firebaseConfig = {
    apiKey: "AIzaSyAosfAbOIJkPtTjaZTWCtsYd846PLk7NXg",
    authDomain: "wallet-5ed1e.firebaseapp.com",
    databaseURL: "https://wallet-5ed1e.firebaseio.com",
    projectId: "wallet-5ed1e",
    storageBucket: "",
    messagingSenderId: "376570274622"
};

@NgModule({
  declarations: [
    MyApp,
    AnimatesDirective,
    PopoverComponent
    
  ],
  imports: [ 
    MbscModule, 
    FormsModule, 
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule , 
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BudgetServiceProvider,
    AuthProvider,
    IncomesServiceProvider,
    ExpensesServiceProvider,
    DataServiceProvider,
    AnimationService,
    Facebook,
    GoalServiceProvider,
    UserServiceProvider,
    ToDoServiceProvider,
    DoingServiceProvider,
    DoneServiceProvider,
  ]
})
export class AppModule {}
