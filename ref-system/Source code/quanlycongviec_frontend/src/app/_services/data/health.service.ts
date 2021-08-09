import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TableName} from '../../_models/constants/tableName';
import {EmpCheckinService} from './empCheckin.service';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  readonly baseUrl = environment.backendUrl;
  covid19Data = TableName.covid19Tb;
  constructor(private http: HttpClient, private empCheckinService: EmpCheckinService) {
  }
  getAddCovid19(){
    const query = {
      query: 'Select * from ' + this.covid19Data
    };
    return this.empCheckinService.getAll(query);
  }
  getAddCovid(city?: boolean){
    let str;
    if (city){
      str = 'Select distinct city from ' + this.covid19Data;
    } else {
      str = 'Select * from ' + this.covid19Data + ' where status = 1';
    }
    const query = {
      query: str
    };
    return this.empCheckinService.getAll(query).toPromise();
  }
  getInfoKBYT(content){
    return this.http.post(this.baseUrl + '/bao_cao_kbyt', content);
  }

}
