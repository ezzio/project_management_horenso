import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multiple-input-template',
  templateUrl: './multiple-input-template.component.html',
  styleUrls: ['./multiple-input-template.component.css']
})
export class MultipleInputTemplateComponent implements OnInit {
  hour = 0;
  day = 0;
  @Input() setInput: any;
  @Output() durationEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.setInput) {
      if (this.setInput > 24) {
        this.day = Math.round(this.setInput / 24);
        this.hour = this.setInput - this.day * 24;
      } else {
        this.hour = this.setInput;
      }
    }
  }

  changeEvent() {
    const a = this.day * 24 + this.hour;
    this.durationEvent.emit(a);
  }

}
