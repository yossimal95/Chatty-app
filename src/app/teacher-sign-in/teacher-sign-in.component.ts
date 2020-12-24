import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { observable } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-teacher-sign-in',
  templateUrl: './teacher-sign-in.component.html',
  styleUrls: ['./teacher-sign-in.component.css'],
})
export class TeacherSignInComponent implements OnInit {
  arr: any[] = [];
  constructor(
    public auth: AngularFireAuth,
    public ser: MainService,
    private router: Router
  ) {
    if (localStorage.getItem('storedTeacherUid')) {
      this.router.navigate(['mainPage']);
    }
  }
  signIn(email: string, password: string) {
    this.ser.signIn(email, password);
  }
  // getAll() {
  //   console.log("sdfsdfsdfsdfsdfsdf")
  //   this.ser.getTeachserName().subscribe(data => {
  //     console.log('data:' + data);
  //     data.map((changes) => {
  //       console.log('ch:' + changes);
  //       this.arr.push(changes.payload.val());
  //       console.log(this.arr);
  //     });
  //   });
  // }
  ngOnInit(): void {}
}
