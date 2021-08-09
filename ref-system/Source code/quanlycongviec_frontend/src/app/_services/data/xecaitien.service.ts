import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class XecaitienService {
  readonly baseUrl = environment.backendUrl;
  constructor(private authService: AuthService, private http: HttpClient) { }

  getPostsList(){
   return this.http.post(this.baseUrl + '/web_list_xe_cai_tien', {email: this.authService.getEmailUser()});
  }
  getTreeCmt(id){
    return this.http.post(this.baseUrl + '/web_tree_comment',
      {email: this.authService.getEmailUser(), id_tree: id});
  }
  createCmt(content){
    return this.http.post(this.baseUrl + '/web_create_msg', content);
  }
  createNewPost(content){
    return this.http.post(this.baseUrl + '/web_create_xe_cai_tien_2', content);
  }
  getSumInfo(){
    return this.http.post(this.baseUrl + '/dem_tong_binh_luan', {email: this.authService.getEmailUser()});
  }
  getEmailList() {
    return this.http.post(this.baseUrl + '' + '/web_get_all_email', {email: this.authService.getEmailUser()});
  }
  getItem(id){
    return this.http.post(this.baseUrl + '/web_item_xe_cai_tien',
      {email: this.authService.getEmailUser(), id_tree: id});
  }
  submitPoint(content){
    return this.http.post(this.baseUrl + '/web_vote_xe_cai_tien', content);
  }
  likeFunc(post, n){
    const content = {
      id_tree: post.id_tree,
      id: post.id,
      email: this.authService.getEmailUser(),
      like: n
    };
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.infoToken
      }),
    };
    return this.http.post(this.baseUrl + '/web_like_xe_cai_tien', content, options);
  }
}

