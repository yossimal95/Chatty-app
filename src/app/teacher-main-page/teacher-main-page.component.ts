import * as hljs from 'highlight.js';
//copy
import { ClipboardService } from 'ngx-clipboard';
//
import { Router } from '@angular/router';
import { MainService } from './../main.service';
import {
  Component,
  Directive,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Student } from '../student';
//auto hljs on techer board
import { interval, Subscription } from 'rxjs';
import { TeacherSignUpComponent } from '../teacher-sign-up/teacher-sign-up.component';

@Component({
  selector: 'app-teacher-main-page',
  templateUrl: './teacher-new-main-page.component.html',
  styleUrls: ['./teacher-main-page.component.css'],
})
export class TeacherMainPageComponent implements OnInit {
  @ViewChild('theCode') codeBlock: ElementRef;
  @ViewChild('preTag') preTag: ElementRef;
  @ViewChild('studentName') studentNameInput: ElementRef;

  //for the auto hljs
  subscription: Subscription;
  //till here
  //for the card menu
  mouseOver: boolean = false;
  //till here
  name: any;
  studentsArr$ = [];
  keys$ = [];
  indexOfSelectedStudent: number;
  cssClass: string = 'hljs language- typescript';
  constructor(
    public ser: MainService,
    private router: Router,
    private elRef: ElementRef,
    private CBcopy: ClipboardService
  ) {}
  addNewStudent(studentName: string) {
    if (studentName.length < 3 || studentName.length > 15) {
      alert('please type better name & try agian..');
    } else {
      this.ser.addNewStudent({
        name: studentName,
        board: 'empty',
        writePermission: true,
      });
    }
    this.studentNameInput.nativeElement.value = '';
  }
  openStudent(studentNum: number) {
    this.indexOfSelectedStudent = studentNum;
    //this.forcePrettier('');
  }
  updateStudentBoard(boardData: string) {
    this.ser.updateStudentBoard(
      this.keys$[this.indexOfSelectedStudent],
      boardData
    );
  }
  ngOnInit(): void {
    this.ser.getAllStusents().subscribe((data) => {
      if (this.studentsArr$) this.studentsArr$ = [];
      if (this.keys$) this.keys$ = [];
      data.map((changes) => {
        this.studentsArr$.push(changes.payload.val());
        this.keys$.push(changes.payload.key);
        //console.log(this.studentsArr$[0].board)
      });
    });
  }

  forcePrettier(some: string) {
    let code = hljs.highlightAuto(this.codeBlock.nativeElement.innerHTML);
    this.cssClass = 'hljs language-' + code.language;
    hljs.highlightBlock(this.codeBlock.nativeElement);
  }

  cleanBoard() {
    this.codeBlock.nativeElement.innerHTML = '';
  }

  //copy student's link
  copyStudentLink(studentId: number) {
    this.CBcopy.copy(
      //'http://localhost:4200/stusentLogIn?teacherId=' +
      'https://final-project-yossi-malach.web.app/stusentLogIn?teacherId=' +
        this.ser.teacherUid +
        '&studentId=' +
        this.keys$[studentId]
    );
  }

  //copy board
  copyBoard() {
    this.CBcopy.copy(this.codeBlock.nativeElement.innerText);
  }

  //delete student
  deleteStudent(studentKey: number) {
    this.indexOfSelectedStudent = -1;
    this.ser.deleteStudent(this.keys$[studentKey]);
  }

  //open save component
  openSave() {
    window.open('savePage', '_blank');
  }

  //allow / prevent student to write
  writeYesOrNo(id: number, status: boolean) {
    this.ser.studentWriteToggle(this.keys$[id], status);
  }
}
