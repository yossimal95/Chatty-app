import { Teacher } from './teacher';
import { Injectable } from '@angular/core';
//fb
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StudentBoardSerService {
  studentObject: Observable<any>;

  constructor(private db: AngularFireDatabase) {}
  getStudent(teacherId: string, studentId: string) {
    return this.db
      .list('/teachers/' + teacherId + '/students/' + studentId)
      .snapshotChanges();
  }
  //change student board contant
  updateStudentBoard(techerId: string, studentKey: string, data: string) {
    //console.log(data);
    data.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.db
      .list('/teachers/' + techerId + '/students/' + studentKey)
      .set('board', data);
  }
}
