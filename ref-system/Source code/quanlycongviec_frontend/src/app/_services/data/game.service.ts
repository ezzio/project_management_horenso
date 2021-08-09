import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {QueryService} from '../modify/query.service';
import {EmpCheckinService} from './empCheckin.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private queryService: QueryService,
              private empCheckinService: EmpCheckinService, private authService: AuthService) { }
  getResultOfQuaySo(content){
    return this.http.post<any>(this.baseUrl + '/game_quay_so', content);
  }
  getInfoTable(searchItem){
    const q = this.queryService.getQueryForGameQuaySo(searchItem);
    return {obs: this.empCheckinService.getAll(q), query: q.query};
  }
  getInfoKetquaInWeek(searchItem){
    const qF = this.queryService.getQueryForKQGameQuaySo(searchItem).queryFull;
    const qI = this.queryService.getQueryForKQGameQuaySo(searchItem).queryInput;
    return {obs: this.empCheckinService.getAll(qF), query: qI.query};
  }

  getResultOfLacso(){
    const content = {
      email: this.authService.getEmailUser(),
    };
    return this.http.post(this.baseUrl + '/web_lucky_game', content);
  }
  getInfoOfLacso() {
    const content = {
      email: this.authService.getEmailUser(),
    };
    return this.http.post(this.baseUrl + '/web_game_info', content);
  }
  getHisOfLacso() {
    const content = {
      email: this.authService.getEmailUser(),
    };
    return this.http.post(this.baseUrl + '/web_history_win', content);
  }

  getInfoQuayso(content) {
    return this.http.post<any>(this.baseUrl + '/select_data_table', content);
  }

}
