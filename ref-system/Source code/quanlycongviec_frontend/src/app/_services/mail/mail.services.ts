import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class MailService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  sendMail(body){
    return this.http.post(this.baseUrl + '/sendmail', body);
  }
  sendOfficeMail(content){
    return this.http.post<any>(this.baseUrl + '/module_office_CTP', content);
  }
}
