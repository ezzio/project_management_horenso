import {Component, EventEmitter, Input,  OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-form-template',
  templateUrl: './table-form-template.component.html',
  styleUrls: ['./table-form-template.component.css']
})
export class TableFormTemplateComponent implements OnInit{
  @Input() public tableConfig: any;
  @Input() public tableContent: any;
  @Input() public elementAdded: any;
  @Input() public customSelect: any;
  @Input() public tableConfigChosen: EventEmitter<object>;
  @Input() public tableContentChosen: EventEmitter<object>;
  @Output() formTableEvent = new EventEmitter<object>();
  elementEvent = new EventEmitter<object>();
  public tableConfigResult: any;
  public tableContentResult: any;
  constructor() {
  }

  ngOnInit(): void {
    this.checkTableConfig();
  }

  checkTableConfig() {
    if (this.tableConfigChosen) {
      this.tableConfigChosen.subscribe(event => {
        this.tableConfigResult = event;
        this.checkTableContent();
      });
    } else if (this.tableConfig) {
      this.tableConfigResult = this.tableConfig;
      this.checkTableContent();
    }
  }

  checkTableContent() {
    if (this.tableContentChosen) {
      this.tableContentChosen.subscribe(event => {
        this.tableContentResult = event.value;
        console.log(this.tableContentResult);
      });
    } else if (this.tableContent) {
      this.tableContentResult = this.tableContent;
    }
  }

  receiveForm(i, e) {
    const key = Object.keys(e)[0];
    this.tableContentResult[i][key] = e[key];
  }

  addRow() {
    this.tableContentResult.push(this.elementAdded[0]);
  }
  saveRow(){
    this.formTableEvent.emit(this.tableContentResult);
    this.tableContentResult = this.elementAdded;
  }

  deleteRow(obj) {
    this.tableContentResult = this.tableContentResult.filter((item) => item !== obj);
  }

}
