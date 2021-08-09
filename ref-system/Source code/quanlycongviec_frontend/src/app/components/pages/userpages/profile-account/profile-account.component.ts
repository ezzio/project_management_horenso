/* tslint:disable:variable-name */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../_services/data/user.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {EmpService} from '../../../../_services/data/emp.service';
import {EmployeeClass} from '../../../../_models/classes/element/empItem';
import {AuthService} from '../../../../_services/auth/auth.service';
import {DataService} from '../../../../_services/data/data.service';
import {TableName} from '../../../../_models/constants/tableName';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class ProfileAccountComponent implements OnInit {
  emp_name: any;
  emp_code: any;
  birthday: any;
  cmnd: any;
  email: any;
  job_title: any;
  sex: any;
  contract_type: any;
  child_depart: any;
  mobile_phone: any;
  mstcn: any;
  contract_begin: any;
  contract_end: any;
  status_working: any;
  date_join_company: any;
  date_quit_job: any;

  isEmpEdit: boolean;
  newValue = new EmployeeClass().createEmployeeItem();

  constructor(private userService: UserService,
              private authService: AuthService, private dataService: DataService) {
    // this.isUserRight();
  }

  async ngOnInit() {
    await this.getInfo();
  }

  async getInfo() {
    const data = await this.userService.getInfoEmpByEmail();
    console.log(data);
    const dt = data[0];
    console.log(dt);
    if (dt) {
      Object.keys(dt).forEach((key) => {
        if (key === 'birthday' || key === 'contract_begin' || key === 'contract_end' ||
          key === 'date_join_company') {
          this[key] = new Date(dt[key]);
        }
        else
        {
          this[key] = dt[key];
        }
      });
      if (dt.status_working === 1) {
        this.status_working = 'Đang làm việc';
      }
      if (dt.sex === 'M') {
        this.sex = 'Nam';
      }
      if (dt.sex === 'F') {
        this.sex = 'Nữ';
      }
    }
  }

  convertToString(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  onSubmit() {
    Object.keys(this.newValue).forEach((key) => {
      if (key === 'birthday' || key === 'contract_begin' || key === 'contract_end' ||
        key === 'date_join_company') {
        this.newValue[key] = [this.convertToString(this[key].getDate()),
          this.convertToString(this[key].getMonth() + 1),
          this.convertToString(this[key].getFullYear())].join('/');
      }
      else if (key === 'status_working') {
        if (this[key] === 'Đang làm việc') {
          this.newValue[key] = 1;
        }
      }
      else if (key === 'sex') {
        if (this[key] === 'Nam'){
          this.newValue[key] = 'M';
        }
        else if (this[key] === 'Nữ') {
          this.newValue[key] = 'F';
        }
      }
      else {
        this.newValue[key] = this[key];
      }
    });
    const objAdd = {
      array: [this.newValue],
      user_email: this.authService.getEmailUser(),
      name_table: TableName.employeeTb
    };
    console.log(objAdd);
    this.dataService.updateData(objAdd).subscribe((res) => {
      if (res.result) {
        const r = res.result;
        if (r.status === 1){
          Swal.fire('Hoàn thành', r.msg, 'success');
        } else {
          Swal.fire('Lỗi', r.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Thay đổi thất bại', 'error');
      }
    }, error => {
      Swal.fire('Lỗi', 'Thay đổi thất bại', 'error');
    });
  }

  // isUserRight() {
  //   this.userService.isUserRightForEmp().subscribe((res) => {
  //     this.isEmpEdit = res.isEmpEdit;
  //   });
  // }
}

