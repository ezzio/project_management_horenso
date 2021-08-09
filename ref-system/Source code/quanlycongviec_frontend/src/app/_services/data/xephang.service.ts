import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {TableName} from '../../_models/constants/tableName';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XephangService {
  readonly baseUrl = environment.backendUrl;
  xephangTb = TableName.xephangTb;
  constructor(private queryService: QueryService, private empCheckinService: EmpCheckinService,
              private http: HttpClient) {
  }
  getInfoFromXephangTb(searchItem){
    const q = this.queryService.getQueryForXepHang(searchItem);
    return {obs: this.empCheckinService.getAll(q), query: q.query};
  }
}
