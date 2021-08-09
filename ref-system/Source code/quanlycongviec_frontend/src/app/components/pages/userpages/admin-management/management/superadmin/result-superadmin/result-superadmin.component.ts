import {Component, EventEmitter, Input, OnChanges, OnInit} from '@angular/core';
import {EditSuperadminComponent} from '../edit-superadmin/edit-superadmin.component';
import {TableName} from '../../../../../../../_models/constants/tableName';
import {AdminClass} from '../../../../../../../_models/classes/element/adminItem';


@Component({
  selector: 'app-result-superadmin',
  templateUrl: './result-superadmin.component.html',
  styleUrls: ['./result-superadmin.component.css']
})
export class ResultSuperadminComponent implements OnInit, OnChanges {
  @Input() searchMessage: any;
  public tableContent: any;
  public tableConfig: any;
  @Input() isSuperAdmin: boolean;
  tableName = TableName.adminTb;
  inputAdmin = EditSuperadminComponent;
  tableContentEvent: EventEmitter<object> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.tableConfig = new AdminClass().createTableSuperAdmin();
  }
  ngOnChanges() {
    this.tableContent = this.searchMessage;
    this.tableContentEvent.emit(this.tableContent);
  }

}
