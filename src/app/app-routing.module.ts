import { AdminComponent } from './admin/admin.component';
import { SavePageComponent } from './save-page/save-page.component';
import { StudentLogInByLinkPageComponent } from './student-log-in-by-link-page/student-log-in-by-link-page.component';
import { StudentBoardComponent } from './student-board/student-board.component';
import { TeacherMainPageComponent } from './teacher-main-page/teacher-main-page.component';
import { TeacherSignInComponent } from './teacher-sign-in/teacher-sign-in.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { TeacherSignUpComponent } from './teacher-sign-up/teacher-sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeAboutComponent },
  { path: 'signIn', component: TeacherSignInComponent },
  { path: 'signUp', component: TeacherSignUpComponent },
  { path: 'mainPage', component: TeacherMainPageComponent },
  { path: 'board', component: StudentBoardComponent },
  { path: 'stusentLogIn', component: StudentLogInByLinkPageComponent },
  { path: 'savePage', component: SavePageComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
