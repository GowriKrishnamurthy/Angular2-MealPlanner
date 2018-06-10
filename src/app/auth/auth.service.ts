import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authToken: string;
  constructor(private router: Router) {}
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

  signinUser(email: string, passsword: string) {
    firebase.auth().signInWithEmailAndPassword(email, passsword)
      .then(response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.authToken = token
          )
      }
      )
      .catch(error => console.log(error)
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
    this.authToken=null;
  }
}