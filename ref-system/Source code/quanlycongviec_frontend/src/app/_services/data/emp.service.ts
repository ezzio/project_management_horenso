import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableName} from '../../_models/constants/tableName';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';
import {ContractList, JobTitle, EmployeeClass} from '../../_models/classes/element/empItem';
import {CategorySalary} from '../../_models/constants/categorySalary';
import {UserService} from './user.service';
import {ReplaySubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmpService {
  readonly baseUrl = environment.backendUrl;
  employeesTb = TableName.employeeTb;
  ticketTb = TableName.ticket;
  empCheckinTb = TableName.empCheckinTb;
  accountTb = TableName.accountTb;
  departmentTb = TableName.departmentTb;
  deviceIdTB = TableName.deviceIdTb;
  adminTb = TableName.adminTb;
  bankTb = TableName.bankTb;
  ctyfptTb = TableName.ctyTb;
  arrayChildDepart = [];
  arrayContract = [];
  arrayTypeCategory = [];
  arrayJobTitle = [];

  constructor(private http: HttpClient, private queryService: QueryService,
              private empCheckinService: EmpCheckinService,
              private userService: UserService) {
  }

  getEmp(value) {
    const query = {
      query: 'Select emp_name from ' + this.employeesTb + ' Where emp_code=' + '\'' + value + '\''
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getNameOrCodeEmp(str, value) {
    const query = {
      query: 'Select ' + str + ' from ' + this.employeesTb + ' Where email=' + '\'' + value + '\''
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
  }

  getEmail(obj) {
    const a = Object.keys(obj)[0];
    let queryStr;
    if (a === 'emp_code') {
      queryStr = this.employeesTb;
    } else {
      queryStr = this.deviceIdTB;
    }
    const query = {
      query: 'Select email from ' + queryStr + ' Where ' + a + ' =' + '\'' + obj[a] + '\'',
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getMBN(value?) {
    let str = 'Select MBN_account_name from ' + this.accountTb;
    if (value) {
      str = str + ' Where emp_code=' + '\'' + value + '\'';
    }
    const query = {
      query: str
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getEmpCodeFromEmail(value) {
    const query = {
      query: 'Select a.emp_code, b.MBN_account_name from ' + this.employeesTb + ' a left join ' +
        this.accountTb + ' b on a.emp_code = b.emp_code Where a.email= ' + '\'' + value + '\''
    };

    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getEmpCode(value) {
    const query = {
      query: 'Select emp_code from ' + this.empCheckinTb + ' Where MBN_account_name= ' + '\"' + value + '\"'
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getAllEmp() {
    const query = {
      query: 'Select * from ' + this.employeesTb
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getMBNFromDeviceTb() {
    const query = {
      query: 'Select MBN_account_name from ' + this.deviceIdTB
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getEmailFollowChildDepart(childDepart) {
    const query = {
      query: 'Select email from ' + this.employeesTb + ' where child_depart = \'' + childDepart + '\''
    };
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  getDetailEmp(code) {
    const query = {
      query: 'Select * from ' + this.employeesTb + ' where emp_code = \'' + code + '\''
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  // getEmpJoinTbOld(searchItem) {
  //     // tslint:disable-next-line:max-line-length
  //     const queryString = 'SELECT a.*, b.emp_name, b.child_depart, c.child_depart1 FROM ' + this.empCheckinTb + ' a LEFT JOIN ' + this.employeesTb + ' b on a.emp_code = b.emp_code '
  //         // tslint:disable-next-line:max-line-length
  //         + ' LEFT JOIN ' + this.departmentTb + ' c on b.child_depart = c.child_depart WHERE ' + this.queryService.getQueryForCheckin(searchItem);
  //     const query = {
  //         query: queryString
  //     };
  //     return this.empCheckinService.getAll(query);
  // }

  // getEmpJoinTb(searchItem) {
  //     // tslint:disable-next-line:max-line-length
  //     const queryString = 'SELECT a.*, b.emp_name, b.child_depart, c.child_depart1 FROM ' + this.empCheckinTb + ' a LEFT JOIN ' + this.employeesTb + ' b on a.emp_code = b.emp_code '
  //         // tslint:disable-next-line:max-line-length
  //         + ' LEFT JOIN ' + this.departmentTb + ' c on b.child_depart = c.child_depart WHERE ' + this.queryService.getQueryForCheckinNew(searchItem);
  //     const query = {
  //         query: queryString
  //     };
  //     return this.empCheckinService.getAll(query);
  // }

  getEmpTb(searchItem) {
    // tslint:disable-next-line:max-line-length
    const queryString = 'SELECT * FROM ' + this.employeesTb + ' WHERE ' + this.queryService.getQueryForEmp(searchItem);
    const query = {
      query: queryString
    };
    return {obs: this.empCheckinService.getAll(query), query: query};
  }

  updateOrAddEmp(content) {
    return this.http.post<any>(this.baseUrl + '/add_data_table', content);
  }

  getChildDepartFollowBranch(str) {
    const query = {
      query: 'Select distinct child_depart from ' + this.departmentTb + ' where branch = \'' + str + '\''
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getParentDepart(str?) {
    let queryString;
    let strAdd = '';
    if (str && str === 'adminpnc') {
      strAdd = 'and branch=\'PNC\'';
    } else if (str && str === 'admintin') {
      strAdd = 'and branch=\'TIN\'';
    } else {
      strAdd = '';
    }
    queryString = 'SELECT distinct parent_depart FROM ' + this.departmentTb + ' where parent_depart != \'admin\' ' +
      'and parent_depart != \'adminpnc\' and parent_depart != \'admintin\' ' + strAdd + ' order by parent_depart asc';
    const query = {
      query: queryString
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  async parentDepartList(str?) {
    const array = [];
    const dt = await this.getParentDepart(str);
    const arrayNew = dt.filter(
      (item, i, arr) => arr.findIndex(t => t.parent_depart === item.parent_depart) === i
    );
    arrayNew.forEach((i) => {
      array.push(i.parent_depart);
    });
    return array;
  }

  getChildDepartFollowParent(arr) {
    let cond = '';
    if (arr) {
      for (const i of arr) {
        cond = cond + '\"' + i + '\"' + ', ';
      }
      cond = cond.substr(0, cond.length - 2);
    }
    const queryString = 'SELECT child_depart FROM ' + this.departmentTb + ' where parent_depart in (' + cond + ')';
    const query = {
      query: queryString
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  async childDepartListFollowParent(value) {
    const dt = await this.getChildDepartFollowParent(value);
    const arrayNew = dt.filter(
      (item, i, arr) => arr.findIndex(t => t.child_depart === item.child_depart) === i
    );
    return arrayNew;
  }

  getEmailFromUserRightTb() {
    const queryString = 'SELECT email FROM ' + this.adminTb;
    const query = {
      query: queryString
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getSuperAdminFromUserRightTb() {
    const queryString = 'SELECT email, per_id FROM ' + this.adminTb + ' where super_admin != \'\'';
    const query = {
      query: queryString
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  async emailListFromRightTb() {
    const array = [];
    const dt = await this.getEmailFromUserRightTb();
    const arrayNew = dt.filter(
      (item, i, arr) => arr.findIndex(t => t.email === item.email) === i
    );
    arrayNew.forEach((i) => {
      array.push(i.email);
    });
    return array;
  }

  async superadminListFromRightTb() {
    const array = [];
    const dt = await this.getSuperAdminFromUserRightTb();
    const arrayNew = dt.filter(
      (item, i, arr) => arr.findIndex(t => t.email === item.email) === i
    );
    arrayNew.forEach((i) => {
      array.push(i.email);
    });
    return array;
  }

  getSomeEmpInfo(str) {
    let query;
    if (str === 'child_depart') {
      query = {
        query: 'Select child_depart from ' + this.departmentTb
      };
    }
    if (str === 'job_title') {
      query = {
        query: 'Select distinct job_title from ' + this.employeesTb
      };
    }
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  public async childDepartList() {
    const array = [];
    const dt = await this.getSomeEmpInfo('child_depart');
    dt.filter(
      (item, i, arr) => arr.findIndex(t => t.child_depart === item.child_depart) === i
    );
    dt.forEach((i) => {
      array.push(i.child_depart);
    });
    return array;
  }

  public async jobTitleList() {
    const array = [];
    const dt = await this.getSomeEmpInfo('job_title');
//       dt = dt.filter(
//         (item, i, arr) => arr.findIndex(t => t.job_title === item.job_title) === i
//       );
    dt.forEach((i) => {
      array.push(i.job_title);
    });
    return array;
  }

  async getTableDetailEmpTable() {
    this.arrayChildDepart = await this.childDepartList();
//     this.arrayJobTitle = await this.jobTitleList();
//     console.log(this.arrayJobTitle);
    CategorySalary.forEach((i) => {
      this.arrayTypeCategory.push(i.name);
    });
    const tableEmp = new EmployeeClass().createTableEmployee();
    tableEmp.columns.forEach((i) => {
      if (i.dataField === 'contract_type') {
        Object.assign(i, {options: ContractList});
      }
      if (i.dataField === 'child_depart') {
        Object.assign(i, {options: this.arrayChildDepart});
      }
      if (i.dataField === 'type_salary') {
        Object.assign(i, {options: this.arrayTypeCategory});
      }
      if (i.dataField === 'job_title') {
        Object.assign(i, {options: JobTitle});
      }
    });
    return tableEmp;
  }

  getEmpByEmailFromEmployeeTb(arr) {
    let cond = '';
    if (arr) {
      for (const i of arr) {
        cond = cond + '\"' + i + '\"' + ', ';
      }
      cond = cond.substr(0, cond.length - 2);
    }
    const query = {
      query: 'Select * from ' + this.employeesTb + ' where email in (' + cond + ')'
    };
    const a = this.empCheckinService.getAll(query).toPromise();
    return a;
  }

  getOneInfoFromStr(value, typeTb) {
    let query;
    if (typeTb === 'emp') {
      query = {
        query: 'Select * from ' + this.employeesTb + ' Where emp_name=' + '\'' + value + '\''
      };
    } else if (typeTb === 'tamung') {
      query = {
        query: 'Select * from ' + this.ticketTb.tamungTb + ' Where ng_tao=' + '\'' + value + '\''
      };
    } else if (typeTb === 'email') {
      query = {
        query: 'Select * from ' + this.employeesTb + ' Where email=' + '\'' + value + '\''
      };
    } else if (typeTb === 'bank') {
      query = {
        query: 'Select * from ' + this.bankTb + ' Where ten_ngan_hang=' + '\'' + value + '\''
      };
    } else if (typeTb === 'ctyfpt') {
      query = {
        query: 'Select * from ' + this.ctyfptTb,
      };
    }
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getTBContentForTins(type, searchItem) {
    let queryString;
    let query;
    if (type === 'emp') {
      queryString = 'SELECT * FROM ' + this.employeesTb + ' WHERE ' + this.queryService.getQueryForEmp(searchItem);
      query = {query: queryString};
    }
    if (type === 'location') {
      query = {query: this.queryService.getInfoLocation(searchItem)};
    }
    return {obs: this.empCheckinService.getAll(query), query: query};
  }

  // isUserRightForEmp() {
  //   const isEmpEdit: ReplaySubject<any> = new ReplaySubject(1);
  //   const right = {
  //     isEmpEdit: false,
  //     isRightUser: false
  //   };
  //   this.userService.getUserRightAll().subscribe((res) => {
  //     console.log(res);
  //     // right.isRightUser = res.isRightUser;
  //     // if (res.isEdit !== null) {
  //     //   const arrayPerId = res.isEdit.split(',');
  //     //   if (arrayPerId.includes('0') || arrayPerId.includes('6')) {
  //     //     right.isEmpEdit = true;
  //     //   }
  //     // }
  //     // isEmpEdit.next(right);
  //   });
  //   return isEmpEdit;
  // }

  getLocationEmp(content) {
    return this.http.post<any>(this.baseUrl + '/get_location_emp', content);
  }

  getDistanceEmp(content) {
    return this.http.post<any>(this.baseUrl + '/get_distance_emp', content);
  }

  xuatBaocao(content) {
    return this.http.post<any>(this.baseUrl + '/xuat_file_thong_tin_ung_vien_dau', content);
  }

  infoEmpPass() {
    const content = {
      type: 'view'
    };
    return this.http.post<any>(this.baseUrl + '/api_thong_tin_nhung_ung_vien_dat', content);
  }
}
