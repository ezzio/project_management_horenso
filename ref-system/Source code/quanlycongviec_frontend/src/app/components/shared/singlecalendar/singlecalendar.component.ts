import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {type} from 'os';

@Component({
  selector: 'app-singlecalendar',
  templateUrl: './singlecalendar.component.html',
  styleUrls: ['./singlecalendar.component.css']
})
export class SingleCalendarComponent implements OnInit {
  model: NgbDateStruct;
  @Input() valueTime: any;
  @Input() isTime: boolean;
  @Input() interval: any;
  @Input() customFormat: any;
  @Input() setDate: any;
  @Input() setDateTime: any;
  @Input() classCalendar: boolean;
  @Input() styleInput: any;
  @Input() styleBtn: any;
  @Input() styleForm = 'form200';
  @Input() customForm: any;
  @Input() styleInputGroup = 'inputGroup100';
  @Input() disable: boolean;
  @Input() required: boolean;
  @Input() placeholder = 'dd/mm/yyyy';
  @Output() messageEvent = new EventEmitter<any>();
  @Output() timeEvent = new EventEmitter<any>();
  @Input() maxDate;
  @Input() minDate;
  @Input() defaultDay: any;
  @Input() isDisabled: boolean;
  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    if (this.setDateTime && this.setDateTime !== '') {
      const a = this.setDateTime.split(' ');
      this.model = this.convertDate(a[0]);
      this.valueTime = a[1].substr(0, a[1].length - 3);
      this.timeEvent.emit(this.valueTime);
    } else if (this.setDate && this.setDate !== '') {
      if (typeof (this.setDate) === 'string') {
        this.model = this.convertDate(this.setDate);
      } else {
        this.model = this.setDate;
      }
    } else {
      if (!this.defaultDay) {
        this.model = null;
      } else {
        if (this.defaultDay === 'tmr') {
          this.model = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
          this.minDate = this.calendar.getToday();
        } else if (this.defaultDay === 'today') {
          this.model = this.calendar.getToday();
          this.minDate = this.calendar.getToday();
        }
        this.valueTime = new Date().getHours() + ':00';
      }
    }
    this.timeEvent.emit(this.valueTime);
    this.messageEvent.emit(this.model);
  }

  sendMessage(e) {
    this.model = e;
    this.messageEvent.emit(this.model);
  }

  receiveTime(e) {
    this.timeEvent.emit(e);
  }

  convertDate(str) {
    const d = str.split('/');
    return new NgbDate(Number(d[2]), Number(d[1]), Number(d[0]));
  }
}
