import { Student } from './../student';
import { AdminSerService } from './../admin-ser.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  allTeacherArr = [];
  teachersKeys = [];
  studentsKeys = [];
  selectedTeacherStudentsList = [];
  selectedTeacher: number = 0;

  //saved codes var's:
  codes = [];
  constructor(public adminSer: AdminSerService) {}

  ngOnInit(): void {
    this.adminSer.getAllTeachers().subscribe((res) => {
      this.allTeacherArr = [];
      this.teachersKeys = [];
      res.map((x) => {
        this.allTeacherArr.push(x.payload.val());
        this.teachersKeys.push(x.key);
      });
    });
  }

  //select teacher
  selectTeacher(id: number) {
    this.adminSer.getAllStudent(this.teachersKeys[id]).subscribe((res) => {
      this.selectedTeacherStudentsList = [];
      this.studentsKeys = [];
      res.map((x) => {
        this.selectedTeacherStudentsList.push(x.payload.val());
        this.studentsKeys.push(x.key);
      });
    });
    //console.log(this.selectedTeacherStudentsList);
  }

  //delete student
  deleteStudent(id: number) {
    this.adminSer.delStudent(
      this.teachersKeys[this.selectedTeacher],
      this.studentsKeys[id]
    );
  }

  //delete teacher
  delete(id: number) {
    this.adminSer.delTeacher(this.teachersKeys[id]);
  }

  //get all codes
  getAllCodes() {
    this.adminSer.getAllCode().subscribe((res: any[]) => {
      this.codes = res;
    });
    //console.log(this.codes);
  }

  //delete code
  deleteCode(id: number) {
    this.adminSer.delCode(id).subscribe();
    //refresh codes list
    setTimeout((time) => {
      this.getAllCodes();
    }, 4000);
  }
}
