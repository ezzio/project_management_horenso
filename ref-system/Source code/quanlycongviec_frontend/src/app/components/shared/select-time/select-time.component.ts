import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.css']
})
export class SelectTimeComponent {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() defautTime: any;
  constructor() {
  }
  sendMessage(e){
    this.messageEvent.emit(e);

  }
}
