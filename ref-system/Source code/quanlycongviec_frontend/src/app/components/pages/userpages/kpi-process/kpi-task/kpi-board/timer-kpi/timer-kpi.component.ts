/* tslint:disable:only-arrow-functions */
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-timer-kpi',
  templateUrl: './timer-kpi.component.html',
  styleUrls: ['./timer-kpi.component.css']
})
export class TimerKpiComponent implements OnInit, AfterViewInit {
  colorSlider: ThemePalette = 'warn';
  color: ThemePalette = 'warn';
  @Input() dayremain: any;
  @Input() progressbarValue: any;
  @Input() isShowTime: boolean;
  @Input() dataProgress: any;
  @Input() label: any;
  constructor() { }

  ngOnInit(): void {
    if (this.dataProgress !== undefined && this.dataProgress !== null && this.dataProgress !== ''){
      const today = new Date().getTime();
      let s;
      const dl = new Date(this.convertDate(this.dataProgress.deadline)).getTime();
      s = new Date(this.convertDate(this.dataProgress.t_assigned)).getTime();
      this.progressbarValue = (today - s) * 100 / (dl - s);
      if (this.progressbarValue > 100) {
        this.progressbarValue = 100 + '%';
      }
      else {
        this.progressbarValue = this.progressbarValue + '%';
      }
      const today2 = new Date().getDate();
      const dl2 = new Date(this.convertDate(this.dataProgress.deadline)).getDate();
      const b = dl2 - today2;
      if (b < 0) {
        this.dayremain = 'Hết hạn';
      }
      else {
        this.dayremain = 'Còn ' + b + ' ngày';
      }
    }
    else {
      this.progressbarValue = this.progressbarValue + '%';
      this.dayremain = this.dayremain + '%';
    }
  }

  ngAfterViewInit() {
    // const a = String(this.progressbarValue);
    // const b = document.getElementsByClassName(a);
    // const c = Array.from(b);
    // c.forEach((i) => {
    //   // @ts-ignore
    //   i.style.width =  this.progressbarValue + '%';;
    // });
  }

  convertDate(str){
    const a = str.split(' ');
    const a1 = a[0].split('/');
    return [a1[2], a1[1], a1[0]].join('-') + ' ' + a[1];
  }
  formatLabel() {
    return 'today';
  }
}
