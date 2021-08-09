import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-doublecalendar',
  templateUrl: './doublecalendar.component.html',
  styleUrls: ['./doublecalendar.component.css']
})
export class DoublecalendarComponent implements OnInit {
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() strFromDate: any;
  @Input() strToDate: any;
  @Input() minDate1: any;
  @Input() maxDate1: any;
  @Input() minDate2: any;
  @Input() maxDate2: any;
  @Input() defaultDate1: any;
  @Input() defaultDate2: any;
  disableToDate: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  receiveDate(str, e) {
    console.log(e);
    if (str === this.strFromDate && e !== '') {
      const a = e.split('/');
      this.minDate2 = {year: a[2], month: a[1], day: a[0]};
    }
  }

  receiveTime(str, e) {
  }
}
