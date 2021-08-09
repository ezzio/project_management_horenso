import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';


@Injectable({ providedIn: 'root' })
export class LocationService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private queryService: QueryService, private empCheckinService: EmpCheckinService) {
  }
  getInfoAccFollowCondition(searchItem) {
    const queryObj = {
      query: this.queryService.getInfoLocation(searchItem),
    };
    return {obs: this.empCheckinService.getAll(queryObj), query: queryObj};
  }
}
