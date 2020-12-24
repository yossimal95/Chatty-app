import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//fb
import { AngularFireModule } from '@angular/fire'; //'angularfire2';
import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { TeacherSignUpComponent } from './teacher-sign-up/teacher-sign-up.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { TeacherSignInComponent } from './teacher-sign-in/teacher-sign-in.component';
import { TeacherMainPageComponent } from './teacher-main-page/teacher-main-page.component';
import { StudentBoardComponent } from './student-board/student-board.component';
import { StudentLogInByLinkPageComponent } from './student-log-in-by-link-page/student-log-in-by-link-page.component';
//highlight
import {
  HighlightModule,
  HIGHLIGHT_OPTIONS,
  HighlightOptions,
} from 'ngx-highlightjs';
import { SavePageComponent } from './save-page/save-page.component';
//http
import { HttpClient, HttpClientModule } from '@angular/common/http';
//navigation in  fb
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
//copy
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TeacherSignUpComponent,
    HomeAboutComponent,
    TeacherSignInComponent,
    TeacherMainPageComponent,
    StudentBoardComponent,
    StudentLogInByLinkPageComponent,
    SavePageComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ClipboardModule 
  ],
  providers: [
    // HttpClient,
    // HttpClientModule,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        // The following is just a workaround to activate the line numbers script since dynamic import does not work in Stackblitz
        //lineNumbersLoader: () => null
      },
    },
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
