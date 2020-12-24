import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaveSerService {
  //API TEST url:
  //url: string = "https://jsonplaceholder.typicode.com/photos";

  //API url:
  url: string = 'https://codesapi20201029133717.azurewebsites.net/api/Codes/';

  constructor(private http: HttpClient, private router: Router) {}

  //get all codes
  getCodes(): Observable<any[]> {
    if (!localStorage.getItem('storedTeacherUid')) {
      this.router.navigate(['']);
    }
    return this.http.get<any[]>(
      this.url + '/' + localStorage.getItem('storedTeacherUid')
    );
  }

  //add new code
  addNewCode(code: string, _name: string): Observable<any> {
    //localStorage.getItem('storedTeacherUid');
    try {
      return this.http.post<any>(this.url, {
        teacherKey: localStorage.getItem('storedTeacherUid'),
        name: _name,
        date: new Date().toLocaleDateString(), // .toString(), //   .toString(),
        text: code,
      });
    } catch {}
  }
  //delete code..
  delCode(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id);
  }

  //update code
  updateCode(id: number, newCode: any): Observable<any> {
    return this.http.put<any>(this.url + id, newCode);
  }
}
