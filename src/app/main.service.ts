import { Student } from './student';
import { Router, RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
//auth
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
//fb-db
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  teacherUid: string;

  teacherName: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}
  signUp(name: string, email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(
      (x) => {
        this.db.database
          .ref('/teachers')
          .child(x.user.uid)
          .set({ name: name, students: 'empty' });
        this.router.navigate(['']);
      },
      (err) => {
        window.alert(err);
      }
    );
  }
  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (x) => {
        //window.alert('yes!');
        localStorage.setItem('storedTeacherUid', x.user.uid);
        this.teacherUid = x.user.uid;
        this.router.navigate(['mainPage']);
        this.getTeachserName();
      },
      (err) => {
        window.alert(err);
      }
    );
  }
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }

  //database
  getTeachserName() {
    this.teacherName = this.db
      .object('/teachers/' + this.teacherUid)
      .valueChanges();
  }

  //add student
  addNewStudent(newStudent: Student) {
    this.db
      .list('/teachers/' + this.teacherUid + '/students/')
      .push(newStudent);
  }

  //allow / prevent student to write
  studentWriteToggle(studentKey: string, status: boolean) {
    if (status) {
      this.db
        .list('/teachers/' + this.teacherUid + '/students/' + studentKey)
        .set('writePermission', false);
    } else {
      this.db
        .list('/teachers/' + this.teacherUid + '/students/' + studentKey)
        .set('writePermission', true);
    }
  }

  //get all
  getAllStusents() {
    try {
      if (localStorage.getItem('storedTeacherUid')) {
        this.teacherUid = localStorage.getItem('storedTeacherUid');
      } else {
        this.router.navigate(['']);
      }
      return this.db
        .list(
          '/teachers/' + localStorage.getItem('storedTeacherUid') + '/students/'
        )
        .snapshotChanges();
    } catch {
      return this.db
        .list('/teachers/' + this.teacherUid + '/students/')
        .snapshotChanges();
    }
  }
  //change student board contant
  updateStudentBoard(studentKey: string, data: string) {
    //console.log(data);
    data.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.db
      .list('/teachers/' + this.teacherUid + '/students/' + studentKey)
      .set('board', data);
  }

  //delete student
  deleteStudent(studentKey: string) {
    this.db
      .list('/teachers/' + this.teacherUid + '/students/' + studentKey)
      .remove();
  }
}
