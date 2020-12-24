import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.css']
})
export class HomeAboutComponent implements OnInit {

subscription: Subscription;



  constructor() { 
    //emit value in sequence every 10 second
const source = interval(10000);
const text = 'Your Text Here';
this.subscription = source.subscribe(val => console.log(text));


  }

  ngOnInit(): void {
  
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
