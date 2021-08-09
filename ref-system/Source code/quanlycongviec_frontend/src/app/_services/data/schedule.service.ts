import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient) { }
  getAllSchedule() {
    return this.http.get(this.baseUrl + '/schedule');
  }
  updateSchedule(id, content) {
    return this.http.put(this.baseUrl + '/schedule/update/' + id, content);
  }
  addSchedule(content) {
    return this.http.post(this.baseUrl + '/schedule/add', content);
  }
  deleteSchedule(id){
    return this.http.delete(this.baseUrl + '/schedule/delete/' + id);
  }
}
