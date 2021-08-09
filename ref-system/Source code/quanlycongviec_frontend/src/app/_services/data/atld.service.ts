import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';


@Injectable({ providedIn: 'root' })
export class AtldService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private queryService: QueryService, private empCheckinService: EmpCheckinService) {
  }
  getEmailListFollowChildDepart(childDepart) {
    const query = {
      query: this.queryService.getEmailFollowChildDepartQuery(childDepart),
    };
    return this.empCheckinService.getAll(query);
  }
}
