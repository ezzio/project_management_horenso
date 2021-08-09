import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';

@Injectable({providedIn: 'root'})
export class AdminService {
  readonly baseUrl = environment.backendUrl;

  constructor(private http: HttpClient, private authService: AuthService,
              private queryService: QueryService, private empCheckinService: EmpCheckinService) {
  }
  getAllAdminRightOrATLD(str, content){
    const queryObj = {
      query: this.queryService.getQueryForAdminRightAndATLD(str, content),
    };
    return {obs: this.empCheckinService.getAll(queryObj), query: queryObj};
  }
  getAllEmailList(childDepart) {
    const query = {
      query: this.queryService.getEmailAdminFollowChildDepartQuery(childDepart),
    };
    return this.empCheckinService.getAll(query);
  }
  editAdmin(content){
    return this.http.post(this.baseUrl + '/import_user_right', content);
  }
  editSuperAdmin(content){
    return this.http.post(this.baseUrl + '/import_admin_right', content);
  }

  childDepartList(){

  }
}

