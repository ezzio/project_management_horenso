import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {EmpCheckin} from '../../_models/classes/emp_checkin';
import {environment} from '../../../environments/environment';
import {QueryService} from '../modify/query.service';
import {TableName} from '../../_models/constants/tableName'

@Injectable({
  providedIn: 'root'
})
export class EmpCheckinService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private queryService: QueryService) {
  }

  getAll(query) {
    return this.http.post<any>(this.baseUrl + '/empCheckin', query);
  }

  updateCheckin(text): Observable<any> {
    return this.http.post(this.baseUrl + '/update_emp_checkin_tb', text);
  }
  addCheckin(content): Observable<any > {
    return this.http.post(this.baseUrl + '/insert_emp_checkin_tb', content);
  }
  findBlockName(code) {
    const query = {
      query: this.queryService.getQueryFindRecentBlock(code),
    };
    return this.getAll(query);
  }
  getInfoFromDepartment(value, str){
     let cond = ''; const array = []; let query;
     if (Array.isArray(value)){
       value.forEach((i) => {
          cond = cond + '\"' + i + '\" ,';
       });
       cond = cond.substr(0, cond.length - 2);
       query = {
          query: 'Select child_depart from ' + TableName.departmentTb + ' where ' + str +' in (' + cond + ')'
       };
     } else {
        query = {
             query: 'Select child_depart from ' + TableName.departmentTb + ' where ' + str +' = \'' + value + '\''
        };

     }

     return this.getAll(query);
  }
}
