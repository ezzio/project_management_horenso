import {Component, EventEmitter, Input, OnChanges, OnInit} from '@angular/core';
import {EditAdminComponent} from '../edit-admin/edit-admin.component';
import {TableName} from '../../../../../../../_models/constants/tableName';
import {AdminClass} from '../../../../../../../_models/classes/element/adminItem';


@Component({
  selector: 'app-result-admin',
  templateUrl: './result-admin.component.html',
  styleUrls: ['./result-admin.component.css']
})
export class ResultAdminComponent implements OnInit, OnChanges {
  @Input()searchMessage: any;
  public tableContent: any;
  public tableConfig: any;
  @Input() isSuperAdmin: boolean;
  tableName = TableName.adminTb;
  inputAdmin = EditAdminComponent;
  tableContentEvent: EventEmitter<object> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.tableConfig = new AdminClass().createTableAdmin();
  }
  ngOnChanges() {
    this.tableContent = this.searchMessage;
    this.tableContentEvent.emit(this.tableContent);
  }

}
