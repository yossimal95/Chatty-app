import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentBoardSerService } from '../student-board-ser.service';
//hljs
import * as hljs from 'highlight.js';
//copy
import { ClipboardService } from 'ngx-clipboard';
import { Key } from 'protractor';
@Component({
  selector: 'app-student-log-in-by-link-page',
  templateUrl: './student-log-in-by-link-page.component.html',
  styleUrls: ['./student-log-in-by-link-page.component.css'],
})
export class StudentLogInByLinkPageComponent implements OnInit {
  @ViewChild('theStudentCode') studentCodeBlock: ElementRef;
  studentWritePermission: boolean = true;
  teacherId: string;
  StudentId: string;
  studentObject$ = [];
  displayStudentName: any;
  cssClass: string = 'hljs language- typescript';
  constructor(
    private route: ActivatedRoute,
    public studentSer: StudentBoardSerService,
    private CBcopy: ClipboardService
  ) {
    //console.log('Called Constructor');
    this.route.queryParams.subscribe((params) => {
      this.teacherId = params['teacherId'];
      this.StudentId = params['studentId'];
    });
    //console.log(this.teacherId + ' ' + this.StudentId);
  }

  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   console.log(event);

  //   if (event.key === Key.CONTROL && event.key === Key.ENTER) {
  //     alert('yes!');
  //   }

  //   // if (event.keyCode === KEY_CODE.LEFT_ARROW) {
  //   //   this.decrement();
  //   // }
  // }

  ngOnInit(): void {
    this.studentSer
      .getStudent(this.teacherId, this.StudentId)
      .subscribe((data) => {
        if (this.studentObject$) this.studentObject$ = [];
        data.map((changes) => {
          // this.studentObject$ = [];
          if (changes.payload.key == 'board') {
            this.studentObject$.push(changes.payload.val());
          }
          if (changes.payload.key == 'name') {
            this.displayStudentName = changes.payload.val();
          }
          if (changes.payload.key == 'writePermission') {
            this.studentWritePermission = changes.payload.val() as boolean;

            // if (!this.studentWritePermission) {
            //   this.studentCodeBlock.nativeElement.style.backgroundColor = 'red';
            // } else {
            //   this.studentCodeBlock.nativeElement.style.backgroundColor =
            //     'darkslategrey';
            // }

            //console.log(this.studentWritePermission);
          }
          //console.log(changes.payload.key);
          //this.keys$.push(changes.payload.key);
          //console.log(this.keys$)
        });
      });
  }
  //update board
  updateBoard() {
    let data: string = this.studentCodeBlock.nativeElement.innerHTML;
    this.studentSer.updateStudentBoard(this.teacherId, this.StudentId, data);
    this.studentCodeBlock.nativeElement.style.outline = '3px solid #2bba14';
    setTimeout(() => {
      this.studentCodeBlock.nativeElement.style.outline = 'none';
    }, 2000);
  }
  //you cant send - permission is false
  noPermissionToWrite() {
    this.studentCodeBlock.nativeElement.style.outline = '3px solid red';
    setTimeout(() => {
      this.studentCodeBlock.nativeElement.style.outline = 'none';
    }, 2000);
  }

  //clean board
  claenBoard() {
    this.studentCodeBlock.nativeElement.innerHTML = '';
  }

  //prettier
  forcePrettier(some: string) {
    let code = hljs.highlightAuto(
      this.studentCodeBlock.nativeElement.innerHTML
    );
    //this.cssClass = 'hljs language-' + code.language;
    hljs.highlightBlock(this.studentCodeBlock.nativeElement);
  }

  //copy board to clipboard
  copyBoard() {
    this.CBcopy.copy(this.studentCodeBlock.nativeElement.innerText);
  }

  tab() {
    let babab = new KeyboardEvent('keydown');
    Object.defineProperty(babab, 'keyCode', {
      get: () => 44,
    });
    //console.log(babab);

    //   let keyboardEvent = new KeyboardEvent('keydown', {
    //     code: 'space',
    //   });

    //   this.studentCodeBlock.nativeElement.dispatchEvent(keyboardEvent);
    //   console.log(keyboardEvent);
  }
}
