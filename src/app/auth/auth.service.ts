import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  signupUser(email: string, passsword: string){
    firebase.auth().createUserWithEmailAndPassword(email,passsword)
    .catch(function(error){
      if(error.code === 'auth/weak-password'){
        throw 'The password is too weak.';
      }
      else
      throw error;
    });
   }

   signinUser(email: string, passsword: string){
    firebase.auth().signInWithEmailAndPassword(email,passsword)
    .then(response =>console.log(response)
    )
    .catch(error =>console.log(error)
    );
   }
}
