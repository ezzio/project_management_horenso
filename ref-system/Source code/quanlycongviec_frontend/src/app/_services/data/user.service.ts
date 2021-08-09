import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TableName} from '../../_models/constants/tableName';
import {AuthService} from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class UserService {
  public readonly baseUrl = environment.backendUrl;
  public employeeTb = TableName.employeeTb;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getInfoEmpByEmail() {
    const emailUser = this.authService.getEmailUser();
    const query = {
      query: 'Select * from ' + this.employeeTb + ' where email = \'' + emailUser + '\'',
    };
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getInfoCandidate(email, interview) {
    if (email) {
      return this.http.post(this.baseUrl + '/get_info_candidate', {email, type: 'gmail', interview});
    }
  }

  getLogin(content) {
    return this.http.post<any>(this.baseUrl + '/login', content);
  }
}
