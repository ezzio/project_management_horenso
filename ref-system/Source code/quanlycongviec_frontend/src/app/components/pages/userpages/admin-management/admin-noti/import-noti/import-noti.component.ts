import { Component, OnInit } from '@angular/core';
import {NotificationClass} from '../../../../../../_models/classes/element/notification';
import {TableName} from '../../../../../../_models/constants/tableName';
import {DataService} from '../../../../../../_services/data/data.service';
import {AuthService} from '../../../../../../_services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-import-noti',
  templateUrl: './import-noti.component.html',
  styleUrls: ['./import-noti.component.css']
})
export class ImportNotiComponent implements OnInit {
  importItem = new NotificationClass().createElement();
  inputComponent: any;
  sizeOfAddOrEdit = 'lg';
  pathDownload = 'formNotify.xlsx';
  resultUpdate: any;
  tableNoti: any;
  importList: any;

  constructor(private spinnerService: NgxSpinnerService, private dataService: DataService,
              private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.tableNoti = new NotificationClass().createTable();
  }
  receiveList(e){
    this.importList = e;
    for (const i of this.importList){
      Object.keys(i).forEach(key => {
        i[key] = i[key].toString();
        this.tableNoti.columns.forEach((j) => {
          if (key === j.title) {
            i[j.dataField] = i[key];
            delete i[key];
          }
        });
      });
    }
    for (const i of this.importList){
      const a = Object.keys(i);
      Object.keys(this.importItem).forEach((eachKey) => {
        if (!a.includes(eachKey)) {
          Object.assign(i, {[eachKey]: ''});
        }
      });
    }
  }
  updateData(){
    this.spinnerService.show();
    const objUpdate = {
      array: this.importList,
      user_email: this.authService.getEmailUser(),
      name_table: TableName.notiTb
    };
    this.dataService.addDataNew(objUpdate).subscribe((res) => {
      let result = res.result;
      if(result && result.status === 1){
        const contentNoti = {
          uuid_notify: result.detail.uuid_notify,
          user_email: this.authService.getEmailUser(),
        }
        this.dataService.notifyAfterImport(contentNoti).subscribe((data) => {
          console.log(data);
          let dr = data.result;
          if(dr){
            if (dr.status === 1){
              if (dr.detail.count_update > 0 || dr.detail.count_insert > 0 ) {
                this.toastrService.success(dr.msg);
                this.resultUpdate =
                    {
                      count_insert: dr.detail.count_insert,
                      count_update: dr.detail.count_update
                    };
              } else {
                this.toastrService.error(dr.msg);
              }
            } else {
              this.toastrService.error(dr.msg);
            }
          } else {
            this.toastrService.error('Cập nhập thất bại!');
          }
        });
      } else if(result && result.status === 0) {
        this.toastrService.error(result.msg);
      }
      this.spinnerService.hide();
    }, error => {
      this.toastrService.error('Cập nhập thất bại!');
      this.spinnerService.hide();
    });
    this.importList = null;
  }
  removeData(){
    this.importList = null;
  }
}
