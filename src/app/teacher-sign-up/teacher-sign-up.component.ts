import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MainService } from '../main.service';

@Component({
  selector: 'app-teacher-sign-up',
  templateUrl: './teacher-sign-up.component.html',
  styleUrls: ['./teacher-sign-up.component.css'],
})
export class TeacherSignUpComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    public ser: MainService,
    private router: Router
  ) {
    if (localStorage.getItem('storedTeacherUid')) {
      this.router.navigate(['mainPage']);
    }
  }

  ngOnInit(): void {}
}
