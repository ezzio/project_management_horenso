import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../../_services/data/data.service';
import {AuthService} from '../../../../_services/auth/auth.service';

@Component({
  selector: 'app-box-element',
  templateUrl: './box-element.component.html',
  styleUrls: ['./box-element.component.css']
})
export class BoxElementComponent implements OnInit {
  @Input() title: any;
  @Input() imgUrl: string;
  @Input() boxContent: any;
  @Input() keyDelete: string;
  @Input() tableName: string;
  @Input() boxContentEvent: EventEmitter<object> = new EventEmitter();
  boxContentResult: any;
  @Input() boxConfig: any;
  @Input() boxConfigEvent: EventEmitter<object> = new EventEmitter();
  boxConfigResult: any;
  @Input() deleteOrNot: boolean;
  @Output() openEvent: EventEmitter<any> = new EventEmitter();
  @Output() checkboxEvent: EventEmitter<any> = new EventEmitter();
  @Input() inputComponent: any;
  @Input() detailSize: string;
  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.boxContentEvent) {
      this.boxContentEvent.subscribe(event => {
        this.boxContentResult = event;
        console.log(event);
      });
    } else if (this.boxContent) {
      this.boxContentResult = this.boxContent;
    }
    if (this.boxConfigEvent) {
      this.boxConfigEvent.subscribe(event => {
        this.boxConfigResult = event;
        console.log(event);
      });
    } else if (this.boxConfig) {
      this.boxConfigResult = this.boxConfig;
    }
    console.log(this.boxConfigResult);
  }
  functionDelete(obj){
    const content = {
      user_email: this.authService.getEmailUser(),
      id_table: obj[this.keyDelete],
      name_table: this.tableName
    };
    this.dataService.deleteDataFunction(content).subscribe((res) => {
      console.log(res);
    });
  }
  openInfo(value){
    this.openEvent.emit({value, opened: 'opened'});
  }
  checkEvent(obj, e){
    obj.checkbox = e.currentTarget.checked;
    this.checkboxEvent.emit({obj, value: obj.checkbox});
  }
}
