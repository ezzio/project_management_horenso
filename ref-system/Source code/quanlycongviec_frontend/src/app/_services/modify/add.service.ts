import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient) { }
  addPTQ(content): Observable<any> {
    // return this.http.post(this.baseUrl + '/ptq/add', content);
    return this.http.post(this.baseUrl + '/add_data_table', content);
  }
}
