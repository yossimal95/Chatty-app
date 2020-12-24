import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminSerService {
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}
  //API url
  url: string = 'https://codesapi20201029133717.azurewebsites.net/api/Codes/';

  //get all teachers
  getAllTeachers() {
    return this.db.list('/teachers/').snapshotChanges();
  }

  //del single teacher
  delTeacher(key: string) {
    return this.db.list('/teachers/' + key).remove();
  }

  //get student per reacher
  getAllStudent(teacherKey: string) {
    return this.db
      .list('/teachers/' + teacherKey + '/students/')
      .snapshotChanges();
  }

  //del student
  delStudent(teacherKey: string, studentKey: string) {
    //console.log(teacherKey + ' ' + studentKey);
    return this.db
      .list('/teachers/' + teacherKey + '/students/' + studentKey)
      .remove();
  }

  //saved codes

  //get all saved codes
  getAllCode() {
    return this.http.get<any[]>(this.url);
  }
  //delete code..
  delCode(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id);
  }
}
