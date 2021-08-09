import {DateTimePicker} from '@syncfusion/ej2-calendars';

export class DatetimeClass {

  public datetimepicker: DateTimePicker;
  constructor() {
    this.datetimepicker = new DateTimePicker({
      format: 'dd-MM-yyyy hh:mm a',
      value: new Date(),
      placeholder: 'Select a date and time',
      width: '233px'
    });
  }
  createDateTime() {
    return this.datetimepicker;
  }
  convertDateTimeToLocale() {
    const a = this.createDateTime().value.toLocaleString();
    return a;
  }
}
