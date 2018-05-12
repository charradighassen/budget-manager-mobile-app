import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { userItem } from '../../models/userItem/userItem';



@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {


    userId: string;
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }
    email: string;
    username: string;
    password: string;
    loginForm: FormGroup;
    isLogin: boolean = true;
    attemptedSubmit: boolean = false;
    formSettings = {
        lang: 'fr',
        theme: 'md'
    };
    userData: any;
    constructor(
        private fb: FormBuilder,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public authpro: AuthProvider,
        private facebook: Facebook,
        public db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private userService: UserServiceProvider
    ) {
        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            username: ['']

        });
    }

    presentLoading() {
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1500
        });
        loader.present();
    }
    markFieldsDirty() {
        for (var field in this.loginForm.controls) {
            this.loginForm.controls[field].markAsDirty();
        }
    }



    errorMessages = {
        required: '{$1} required',
        minlength: 'At least 6 characters required',
        email: 'Invalid email address'
    }

    errorFor(fieldName) {
        var field = this.loginForm.controls[fieldName];
        for (var validator in field.errors) {
            if (field.errors[validator]) {
                var friendlyName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
                return this.errorMessages[validator].replace('{$1}', friendlyName);
            }
        }
        return null;
    }

    signUp(ev) {
        this.attemptedSubmit = true;

        if (this.loginForm.valid) {
            this.afAuth.authState.subscribe(user => {


                console.log(user.uid);
                this.db.list("/users/" + user.uid).push({
                    username: this.loginForm.get('username').value,
                    email: this.loginForm.get('email').value,
                    password: this.loginForm.get('password').value

                })
            })
            this.authpro.signup(this.loginForm.get('email').value, this.loginForm.get('username').value, this.loginForm.get('password').value)


                .then(() => { this.presentLoading(); }).then(() => {
                    this.navCtrl.push('MenuPage');
                }).then(() => {
                    mobiscroll.toast({
                        message: 'Signed Up!',
                        callback: function () {
                            this.loginForm.reset();
                            this.attemptedSubmit = false;
                        }.bind(this)
                    });
                })





        } else {
            this.markFieldsDirty();
        }
    }




    loginWithFB() {
        this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
            this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] }
            });
        });
    }
}
