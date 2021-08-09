import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-single-datetime',
  templateUrl: './single-datetime.component.html',
  styleUrls: ['./single-datetime.component.css']
})
export class SingleDatetimeComponent implements OnInit {
  formGroup : FormGroup;
  dateModel: Date = new Date();
  @Output() sdatetimeEvent: EventEmitter<any> = new EventEmitter();

  @Input() stringDateModel: string = new Date().toString();

  ngOnInit() {
    this.formGroup = new FormGroup({
      activeEndDate:  new FormControl(new Date(), {validators: [Validators.required, DateTimeValidator]})
    }, { updateOn: 'change' });
  }
  receiveEvent(e){
    console.log(new Date(e));
    this.sdatetimeEvent.emit(e);
  }
}

export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
    isValid: {
      valid: false
    }
  };
}

