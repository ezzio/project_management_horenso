import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateTimePicker} from '@syncfusion/ej2-calendars';
import { enableRipple } from '@syncfusion/ej2-base';
import {DatetimeClass} from '../../../_models/classes/datetimePicker';
enableRipple(false);

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements OnInit {
  @Input()labelText: any;
  @Input()idDateTime: any;
  @Output() datetimeEvent = new EventEmitter<any>();
  datetimepicker = new DatetimeClass();
  constructor() {
    this.datetimepicker.createDateTime().appendTo('#' + this.idDateTime);
  }

  ngOnInit(): void {
    const id = '#' + this.idDateTime;
    console.log(id);
  }
  sendMessage(){
    const a = this.datetimepicker.createDateTime().value.toLocaleString();
    this.datetimeEvent.emit(a);
  }

}
