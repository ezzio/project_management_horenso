import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ReplaySubject} from 'rxjs';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getTaskLists(type){
    const content = {
      email: this.authService.getEmailUser(),
      type
    };
    return this.http.post(this.baseUrl + '/web_list_id_task', content);
  }
  createProject(content){
    return this.http.post(this.baseUrl + '/web_create_task', content);
  }
  createProjectFunction(content){
    const obj: ReplaySubject<any> = new ReplaySubject<any>(1);
    this.createProject(content).subscribe((res) => {
      // @ts-ignore
      const r = res.result;
      if (r && r.status === 1){
        obj.next(r.data_id);
        Swal.fire('Hoàn tất', r.msg, 'success');
      } else {
        Swal.fire('Lỗi', r.msg, 'error');
      }
    }, error => {
      Swal.fire('Lỗi', ' Thêm dự án thất bại', 'error');
    });
    return obj;
  }
  getTreeTask(id, view?){
    const content = {
      email: this.authService.getEmailUser(),
      id_tree: id,
      view
    };
    return this.http.post(this.baseUrl + '/web_tree_task', content);
  }
  getGanttTask(id){
    const content = {
      email: this.authService.getEmailUser(),
      id_tree: id,
      view: 'gantt'
    };
    return this.http.post(this.baseUrl + '/web_tree_task', content).toPromise();
  }
  getKanbanList(){
    const content = {
      email: this.authService.getEmailUser(),
    };
    return this.http.post(this.baseUrl + '/web_view_kanban', content);
  }
  getTaskListFollowCondition(type, condition){
    const content = {
      email: this.authService.getEmailUser(),
      condition
    };
    let a;
    if (type === 'following_task'){
      a =  this.http.post(this.baseUrl + '/web_following_task', content);
    } else if (type === 'project') {
      a = this.http.post(this.baseUrl + '/web_project', content);
    }
    return a;
  }

  updateKanbanList(content){
    return this.http.post(this.baseUrl + '/web_edit_task', content);
  }
  updateKanbanFunc(content){
    const arrResult: ReplaySubject<any> = new ReplaySubject<any>(1);
    this.updateKanbanList(content).subscribe((res) => {
      // @ts-ignore
      if (res) {
        // @ts-ignore
        const r = res.result;
        if (r.status === 1) {
          arrResult.next(r.data_new);
          Swal.fire('Hoàn tất', 'Cập nhập thành công', 'success');
        } else {
          Swal.fire('Lỗi', r.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Cập nhập thất bại', 'error');
      }
    }, error => {
      Swal.fire('Lỗi', 'Cập nhập thất bại', 'error');
    });
    return arrResult;
  }

  getOwnerList(){
    const content = {
      email: this.authService.getEmailUser(),
    };
    return this.http.post(this.baseUrl + '/web_view_owner', content);
  }

  getDuAnList(){
    const content = {
      email: this.authService.getEmailUser(),
    };
    return this.http.post(this.baseUrl + '/get_du_an', content);
  }

  getFilterList(content){
    return this.http.post(this.baseUrl + '/filter_cv_fe', content);
  }
  getFilterSet(type){
    const content = {
      email: this.authService.getEmailUser(),
      type
    };
    return this.http.post(this.baseUrl + '/web_get_filter', content);
  }

  setObjectCurrentToElement(element, objCurrent){
    element.title = objCurrent.example_title;
    element.description = objCurrent.description;
    element.t_assigned = objCurrent.t_assigned;
    element.deadline = objCurrent.deadline;
    element.priority = objCurrent.priority;
    element.parent = objCurrent.id.toString();
    element.id_tree = objCurrent.id_tree.toString();
  }

  getEmailAssigned(formConfig, c, update?){
    formConfig.columns.forEach((i) => {
      if (i.dataField === 'assigned'){
        if (c.info_assigned.email) {
          Object.assign(i, {default: c.info_assigned});
        } else if (!c.info_assigned.email) {
          Object.assign(i, {default: c.info_owner});
        }
      }
      if (i.dataField === 'reviewer'){
        if (c.info_reviewer.email) {
          Object.assign(i, {default: c.info_reviewer});
        } else if (!c.info_reviewer.email) {
          Object.assign(i, {default: c.info_owner});
        }
      }
      if (!update && c.t_assigned && c.deadline && (i.dataField === 't_assigned' || i.dataField === 'deadline')) {
        Object.assign(i, {minDate: this.convertDate(c.t_assigned)});
        Object.assign(i, {maxDate: this.convertDate(c.deadline)});
      }
    });
    return formConfig;
  }
  getEmailAndChildDepart(){
    const content = {
      email: this.authService.getEmailUser(),
      type: 'child_depart'
    };
    return this.http.post(this.baseUrl + '/web_get_info_child_depart', content).toPromise();
  }

  convertDate(str) {
    if (typeof (str) === 'string' && str.indexOf('/') > -1){
      const d = str.split(' ')[0].split('/');
      return new NgbDate(Number(d[2]), Number(d[1]), Number(d[0]));
    }
  }
  getArrayList(arr){
    const a = [];
    arr.forEach((i) => {
      a.push(i.email);
    });
    return a;
  }
  sentReport(content){
    return this.http.post(this.baseUrl + '/web_sent_cmt_task', content);
  }

  layBaocao(content){
    return this.http.post('http://192.168.10.127:5000/report_total_fe', content);
  }

  getLogin(content) {
    return this.http.post('http://localhost:5009/login', content);
  }

  isNotify() {

  }

  getNoti(content) {
    return this.http.post('http://localhost:5009/check_noti', content);
  }
  updateStatus(content) {
    return this.http.post('http://localhost:5009/update_status', content);
  }
}
