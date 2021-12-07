import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFireModule } from '@angular/fire/compat';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth,private router:Router) { }
 
  gotoroute() {
    this.router.navigate(['/', 'products']);
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  loggout(){
    this.afauth.signOut();
    
  }





  async register(email:string, password:string){
    try{
      
      return await this.afauth.createUserWithEmailAndPassword(email,password);
      
      
    }catch(err){
      console.log("error registro", err);
      return null;
    }

  }
  
  
  async login(email:string, password:string){
    try{
      
      return await this.afauth.signInWithEmailAndPassword(email,password);
      

    }catch(err){
      console.log("error en login", err);
      return null;
    }

  }

  async loginWithGoogle(email:string, password:string){
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }catch(err){
      console.log("error en login con google.com", err);
      return null;
    }

  }


}
