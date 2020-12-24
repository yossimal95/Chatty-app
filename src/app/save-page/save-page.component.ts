import { SaveSerService } from './../save-ser.service';
import { MainService } from './../main.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//copy
import { ClipboardService, ClipboardModule } from 'ngx-clipboard';
 
@Component({
  selector: 'app-save-page',
  templateUrl: './save-page.component.html',
  styleUrls: ['./save-page.component.css'],
})
export class SavePageComponent implements OnInit {
  @ViewChild('saveCodeInput') saveInput: ElementRef;
  @ViewChild('openCodeInput') openInput: ElementRef;
  @ViewChild('saveNewCodeNameInput') saveNameInput: ElementRef;
  @ViewChild('saveNewCodeInput') saveNewCodeInput: ElementRef;
  @ViewChild('copyTool') copyTool: ElementRef;
 

  title = 'save page';
  myCodes = [];
  selectedCode: number;

  constructor(
    private saveSer: SaveSerService,
    public ser: MainService,
    private CBcopy: ClipboardService         
  ) {}

  ngOnInit(): void {
    //get all codes
    this.saveSer.getCodes().subscribe((res: any[]) => {
      this.myCodes = res;
    });
  }

  //get all codes
  getAllCodes() {
    this.saveSer.getCodes().subscribe((res: any[]) => {
      this.myCodes = res;
    });
  }

  //add new code
  addCode(code: string, name: string) {
    if (name.length > 25 || name.length < 3) {
      name = 'no name';
    }
    if (code.length < 1) {
      this.saveNameInput.nativeElement.value = '';
      this.saveInput.nativeElement.value = '';
      this.saveNewCodeInput.nativeElement.value = '';
      alert('you stupid!');
      return;
    }
    try {
      this.saveNewCodeInput.nativeElement.value = '';
      this.saveSer.addNewCode(code, name).subscribe((res: any[]) => {
        this.myCodes = res;
      });
      //reset codesArr
      setTimeout(() => {
        this.getAllCodes();
      }, 5000);
      this.saveNameInput.nativeElement.value = '';
      this.saveInput.nativeElement.value = '';
      
    } catch {}
  }

  //delete code
  deleteCode() {
    this.saveSer.delCode(this.myCodes[this.selectedCode].id).subscribe();
    //reset codesArr
    setTimeout(() => {
      this.getAllCodes();
    }, 5000);
  }

  //open code dialog
  openCode(id: number) {
    this.selectedCode = id;
    this.openInput.nativeElement.value = this.myCodes[id].text;
  }

  //update code
  updateCode(code: string) {
    let newCode: any = {
      id: parseInt(this.myCodes[this.selectedCode].id),
      teacherKey: localStorage.getItem('storedTeacherUid'),
      name: this.myCodes[this.selectedCode].name,
      date: this.myCodes[this.selectedCode].date,
      text: code,
    };
    this.saveSer
      .updateCode(parseInt(this.myCodes[this.selectedCode].id), newCode)
      .subscribe();

    //reset codesArr
    setTimeout(() => {
      this.getAllCodes();
    }, 5000);
  }

   //copy code
   copy(str:string) {
    this.copyTool.nativeElement.value = str;
    
    
    //alert(this.copyTool.nativeElement.value);
    this.CBcopy.copy("sdfsdfsdf");//"" + this.copyTool.nativeElement.innerHTML);
   }
}
