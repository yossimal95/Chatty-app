
import { Component } from '@angular/core';
//auth
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
//fb-db
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
//service
import { MainService } from './main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chatty!';
  constructor(public auth: AngularFireAuth, public ser:MainService ) {}



  //public auth: AngularFireAuth, private db:AngularFireDatabase, 
  // signUp(name:string, email:string, password:string) {
    
  //     this.auth.createUserWithEmailAndPassword(email,password).then(x => {
  //       window.alert(x.user.displayName)
  //       this.db.list('/teachers').push(x.user.uid).set({"name":name,"students":"empty"});
  //     },
  //     err =>{window.alert(err)}
  //     )
  // }

  // login() {
  //   this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }
  // logout() {
  //   this.auth.signOut();
  // }
}
