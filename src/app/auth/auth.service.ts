import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  // authToken: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store:Store<fromApp.AppState>) { }

  signupUser(email: string, passsword: string) {
    firebase.auth().createUserWithEmailAndPassword(email, passsword)
      .then(response => {
        this.store.dispatch(new AuthActions.Signup());
        firebase.auth().currentUser.getIdToken()
          .then(
            // (token: string) => this.authToken = token
            (token: string) => {this.store.dispatch(new AuthActions.SetToken(token));}
          )
        this.router.navigate(['']);
      })
      .catch(function (error) {
        if (error.code === 'auth/weak-password') {
          alert('Wrong password.');
        } else {
          alert(error.message);
        }
      });
  }

  ngOnInit(): void {
  }
  signinUser(email: string, passsword: string) {
    firebase.auth().signInWithEmailAndPassword(email, passsword)
      .then(response => {
        this.store.dispatch(new AuthActions.Signin());
        firebase.auth().currentUser.getIdToken()
          .then(
            // (token: string) => this.authToken = token
            (token: string) => {this.store.dispatch(new AuthActions.SetToken(token));}
          )
          this.router.navigate(['']);
      }
      )
      .catch(error => alert(error)
      );
  }

  initializeFirebase() {
    firebase.initializeApp({
      apiKey: "AIzaSyAUzIW-H8etDT91heWkLZpRNXXMXqlpiJs",
      authDomain: "ng-meal-planner.firebaseapp.com"
    });

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     user.getIdToken().then(
    //       (token: string) => this.authToken = token
    //     );
    //   }
    // });
  }
  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.authToken = token
  //     )
  //   return this.authToken;
  // }

  // isAuthenticated() {
  //   return this.authToken != null;
  // }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['error'], { relativeTo: this.activatedRoute });
    // this.authToken = null;
    this.store.dispatch(new AuthActions.Logout())
  }
}