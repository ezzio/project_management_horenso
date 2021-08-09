import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TableName} from '../../_models/constants/tableName';
import {PTQClass} from '../../_models/classes/element/ptqItem';

@Injectable({providedIn: 'root'})
export class PtqService implements OnInit {
  readonly baseUrl = environment.backendUrl;
  ptqTb = TableName.ptqTb;
  errorPtqTb = TableName.errorPTQTb;
  errorMainList: any;
  errorGroupList = [];

  constructor(private http: HttpClient, private queryService: QueryService, private empCheckinService: EmpCheckinService) {
  }

  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit() {
  }

  // ptqResultTable(searchItem) {
  //   const q = this.queryService.getQueryForPTQ(searchItem);
  //   return {obs: this.empCheckinService.getAll(q), query: q.query};
  // }

  contractPTQ() {
    const query = {
      query: 'Select contract from ' + this.ptqTb
    };
    return this.empCheckinService.getAll(query);
  }

  errorList(mainOrGroup) {
    const query = {
      query: 'Select ' + mainOrGroup + ' from ' + this.errorPtqTb
    };
    // @ts-ignore
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  async getTablePTQ() {
    // @ts-ignore
    this.errorMainList = await this.getMainErrorList('error_main');
    this.errorGroupList = await this.getMainErrorList('error_group');
    const tablePTQ = new PTQClass().createTablePTQ();
    tablePTQ.columns.forEach((i) => {
      if (i.dataField === 'error_main') {
        Object.assign(i, {options: this.errorMainList});
      }
      if (i.dataField === 'error_group') {
        Object.assign(i, {options: this.errorGroupList});
      }
    });
    return tablePTQ;
  }

  public async getMainErrorList(str) {
    const array = [];
    const dt = await this.errorList(str);
    dt.filter(
      (item, i, arr) => arr.findIndex(t => t[str] === item[str]) === i
    );
    dt.forEach((i) => {
      array.push(i[str]);
    });
    return array;
  }
  getInfoID(id) {
     const query = {
        query: 'Select * from ' + this.ptqTb + ' where ptq_id=' + id,
     }
     return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }
}
