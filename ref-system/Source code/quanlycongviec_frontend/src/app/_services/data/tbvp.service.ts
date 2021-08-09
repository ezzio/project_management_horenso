import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableName} from '../../_models/constants/tableName';
import {environment} from '../../../environments/environment';
import {EmpService} from '../../_services/data/emp.service';
import {CtpClass} from '../../_models/classes/element/ctpItem';
import {QueryService} from '../modify/query.service';
import {SendMailServices} from '../mail/send-mail.services';

@Injectable({
  providedIn: 'root'
})
export class TbvpService {
  readonly baseUrl = environment.backendUrl;
  ticketTb = TableName.ticket;
  bankTb = TableName.bankTb;
  officeWorkFlowTb = TableName.officeWorkFlowTb;
  public query: any;
  childDepartListFollowName = [];

  constructor(private http: HttpClient, private empService: EmpService,
              private queryService: QueryService, private sendMailServices: SendMailServices) {
  }

  getRegion(array) {
    let list = '';
    array.forEach((i) => {
      list = list + '\"' + i + '\"' + ', ';
    });
    list = list.substr(0, list.length - 2);
    return list;
  }

  getChiPhiVanPhong(type, value, email) {
    const date = Object.values(value.date);
    const region = Object.values(value.region);
    if (region[0] != null) {
      const regionList = this.getRegion(region[0]);
      this.query = {
        query: 'Select * from ' + this.ticketTb.unionTb + ' Where category=' + '\'' + value.category + '\'' +
          ' And region in (' + regionList + ')'
      };
    } else {
      if (type === 'union') {
        this.query = {
          query: 'Select * from ' + this.ticketTb.unionTb + ' Where category=' + '\'' + value.category + '\''
        };
      }
      if (type === 'ctp') {
        this.query = {
          query: 'Select * from ' + this.ticketTb.ctpTb + ' where ngay_tao >\'' + date[0] + '\' and ngay_tao <=\'' + date[1] + '\' and ng_tao= \''
            + email + '\' order by task_id DESC'
        };
      }
      if (type === 'tu') {
        this.query = {
          query: 'Select * from ' + this.ticketTb.tamungTb + ' where ngay_tao >\'' + date[0] + '\' and ngay_tao <=\'' + date[1] + '\' and ng_tao= \''
            + email + '\' order by task_id DESC'
        };
      }
    }
    return this.http.post<any>(this.baseUrl + '/empCheckin', this.query);
  }

  getTableChiPhiTBVP(type, searchItem?, status?: string) {
    let table;
    if (type === 'ctp') {
      table = this.ticketTb.ctpTb;
    } else if (type === 'tu') {
      table = this.ticketTb.tamungTb;
    }
    if (!status){
      const q = this.queryService.getQueryForTBVP(table, searchItem);
      const a = this.http.post<any>(this.baseUrl + '/empCheckin', q);
      return {obs: a, query: q};
    } else {
      const q = this.queryService.getQueryForStatusTicket(status, table);
      const a = this.http.post<any>(this.baseUrl + '/empCheckin', q);
      return {obs: a, query: q};
    }
  }

  getDetailTbvp(id) {
    this.query = {
      query: 'Select * from ' + this.ticketTb.unionTb + ' Where union_id=' + '\'' + id + '\''
    };
    return this.http.post(this.baseUrl + '/empCheckin', this.query);
  }

  updateOrAddTbvp(content) {
    return this.http.post<any>(this.baseUrl + '/import_union_tb', content);
  }

  addCtp(content) {
    return this.http.post<any>(this.baseUrl + '/add_data_table', content);
  }

  getDetailCTP(taskTime, tableName) {
    const query = {
      query: 'Select * from ' + tableName + ' Where task_time=' + '\'' + taskTime + '\''
    };

    return this.http.post(this.baseUrl + '/empCheckin', query);
  }

  // getDetailHDCTP(taskTime) {
  //   const query = {
  //     query: 'Select * from ' + this.ticketTb.hoaDonTb + ' Where task_time=' + '\'' + taskTime + '\''
  //   };
  //   return this.http.post(this.baseUrl + '/empCheckin', query);
  // }

  getWorkFlowEmail(str) {
    this.query = {
      query: 'Select * from ' + this.officeWorkFlowTb + ' Where module_name=' + '\'' + str + '\''
    };
    return this.http.post(this.baseUrl + '/empCheckin', this.query);
  }

  getCtp() {
    this.query = {
      query: 'SELECT column_name FROM information_schema.COLUMNS WHERE table_name LIKE \'' + this.ticketTb.ctpTb + '\''
    };
    return this.http.post(this.baseUrl + '/empCheckin', this.query);
  }

  async getCTPTableConfig(value) {
    const dt = await this.empService.getOneInfoFromStr(value, 'emp');
    if (dt) {
      dt.forEach((i) => {
        this.childDepartListFollowName.push(i.child_depart);
      });
    }
    const tableCTP = new CtpClass().createTableCtp();
    tableCTP.columns.forEach((i) => {
      if (i.dataField === 'bp_ng_di_ct') {
        Object.assign(i, {options: this.childDepartListFollowName});
      }
    });
    return tableCTP;
  }

  getOneInfoFromEmail(str, value) {
    const query = {
      query: 'Select ' + str + ' from ' + this.ticketTb.tamungTb + ' where email = \'' + value + '\' and su_dung = 0'
    };
    const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getBranchBank(str) {
    const query = {
      query: 'Select distinct ' + str + ' from ' + this.bankTb,
    };
    const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  async getNguoiDuyetMail(type, email) {
    const condition = 'ng_quan_ly= \'' + email + '\' and step=1 and result=\'PENDING\'';
    const dt = await this.getNguoiDuyetMailFromWorkFlow(email);
    let wf = '';
    let table = '';
    if (type === 'ctp' && dt[0]) {
      Object.keys(dt[0]).forEach((key, index) => {
        if (dt[0][key].toLowerCase() === email.toLowerCase()) {
          wf = 'step=' + index + ' and result=\'PENDING\'';
        }
      });
      table = this.ticketTb.ctpTb;
    } else if (type === 'tamung' && dt[1]) {
      Object.keys(dt[1]).forEach((key, index) => {
        if (dt[1][key].toLowerCase() === email.toLowerCase()) {
          wf = 'step=' + index + ' and result=\'PENDING\'';
        }
      });
      table = this.ticketTb.tamungTb;
    }
    const q1 = 'Select * from ' + table + ' where (' + condition + ') or (' + wf + ') order by ngay_tao desc';
    const query = {
      query: q1,
    };
    const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getNguoiDuyetMailFromWorkFlow(email?) {
    let query;
    if (email) {
      query = {
        query: 'Select * from ' + this.officeWorkFlowTb + ' where lower(\'' + email + '\') in (step_2, step_3, step_4, step_5, step_6)',
      };
    } else {
      query = {
        query: 'Select * from ' + this.officeWorkFlowTb,
      };
    }
    const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  getBillTBVPInfo(str) {
    let query;
    if (str === 'dien_giai') {
      query = {
        query: 'Select distinct dien_giai from ' + TableName.ticket.ctpTb
      };
    }
    const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
    return a;
  }

  public async typeBillTBVPList() {
    const array = [];
    const dt = await this.getBillTBVPInfo('dien_giai');
    dt.filter(
      (item, i, arr) => arr.findIndex(t => t.dien_giai === item.dien_giai) === i
    );
    dt.forEach((i) => {
      array.push(i.dien_giai);
    });
    return array;
  }

  getHistoryTicket(content){
    return this.http.post(this.baseUrl + '/get_history_ticket', content);
  }

  getPendingTicket(email){
    return this.http.post(this.baseUrl + '/get_pending_ticket', {email});
  }


}
