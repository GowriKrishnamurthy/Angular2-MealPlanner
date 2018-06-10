import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
  authToken: string;

  constructor(private router: Router,
              private activatedRoute:ActivatedRoute) {}

  signupUser(email: string, passsword: string) {
    firebase.auth().createUserWithEmailAndPassword(email, passsword)
      .catch(function (error) {
        if (error.code === 'auth/weak-password') {
          throw 'The password is too weak.';
        }
        else
          throw error;
      });
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyAUzIW-H8etDT91heWkLZpRNXXMXqlpiJs",
      authDomain: "ng-meal-planner.firebaseapp.com"
    });
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(
          (token: string) => this.authToken = token
        );
      }
    });     
    }
  
  signinUser(email: string, passsword: string) {
    firebase.auth().signInWithEmailAndPassword(email, passsword)
      .then(response => {
        this.router.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.authToken = token
          )
      }
      )
      .catch(error => alert(error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.authToken = token
      )
      return this.authToken;
  }

  isAuthenticated(){
    return this.authToken!=null;
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(['error'],{relativeTo:this.activatedRoute});
    this.authToken=null;
  }
}