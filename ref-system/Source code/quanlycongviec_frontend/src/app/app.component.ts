import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit{
  public isTest: boolean;
  constructor() {
  }
  public ngOnInit() {
    if (window.location.href.includes('test')){
      this.isTest = true;
    } else {
      this.isTest = false;
    }
  }
}
