import { Injectable } from '@angular/core';
import {TableName} from '../../_models/constants/tableName';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReplaySubject} from 'rxjs';
import {RegistrationParticipant} from '../../_models/classes/element/participant';
import {QueryService} from '../modify/query.service';
import {AddressService} from './address.service';
import {EmpService} from './emp.service';
import Table = WebAssembly.Table;
import {AuthService} from '../auth/auth.service';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  static instance: ParticipantService;
  readonly baseUrl = environment.backendUrl;
  universityTb = TableName.universityTb;
  majorTb = TableName.chuyennganhTb;
  participantTb = TableName.quanlyUngvienTb;
  dantocTb = TableName.dantocTb;
  dethiTb = TableName.dethiTb;
  ctyFptTb = TableName.ctyTb;
  vtcvTb = TableName.vitricvTb;
  ngPvTb = TableName.ngPvTb;
  tuyendungTTCNTb = TableName.tuyendungTTCNTb;
  tuyendungEdutb = TableName.tuyendungEduTb;
  tuyendungExptb = TableName.tuyendungExpTb;
  tuyendungLangtb = TableName.tuyendungLangTb;
  tuyendungCertb = TableName.tuyendungCerTb;
  danhgiaTb = TableName.tuyendungDanhgiaTb;
  allParticipantList: any;
  constructor(private http: HttpClient, private queryService: QueryService, private empService: EmpService,
              private addressService: AddressService, private authService: AuthService,
              private dataService: DataService) {
    ParticipantService.instance = this;
  }
  public getUniversityList(type?){
    const dt: ReplaySubject<any> = new ReplaySubject(1);
    const arr = [];
    let table;
    if (type === 'ten_truong_hoc'){
      table = this.universityTb;
    } else if (type === 'ten_chuyen_nganh') {
      table = this.majorTb;
    } else if (type === 'ten_dan_toc'){
      table = this.dantocTb;
    } else if (type === 'ten_cty'){
      table = this.ctyFptTb;
    } else if (type === 'ten_vi_tri') {
      table = this.vtcvTb;
    }
    const query = {
      query: 'Select ' + type + ' from ' + table,
    };
    this.http.post(this.baseUrl + '/empCheckin', query).subscribe((res) => {
      if (res){
        // @ts-ignore
        res.forEach((i) => {
          arr.push(i[type]);
        });
        dt.next(arr);
      }
    });
    return dt;
  }
  // getParticipantTable(obj?, searchEl?, type?){
  //   let s = '';
  //   if (obj && obj.email){
  //     s = ' where email=\'' + obj.email + '\'';
  //   } else if (obj && obj.name){
  //     s = ' where ho_ten=\'' + obj.name + '\'';
  //   } else if (obj && obj.id){
  //     s = ' where id_ung_vien=\'' + obj.id + '\'';
  //   } else if (searchEl && type === 'info'){
  //     s = ' where ' + this.queryService.getQueryForUngVienInfo(searchEl);
  //   } else if (searchEl && type === 'trungtuyen'){
  //     s = ' where ' + this.queryService.getQueryForUngVienInfo(searchEl) + ' and kq_pv_cuoi_cung = \'Đạt\'';
  //   } else if (!searchEl && type === 'trungtuyen'){
  //           s = ' where kq_pv_cuoi_cung = \'Đạt\'';
  //   } else if (obj && obj.place && type === 'findEmail'){
  //           let condition = '';
  //           obj.place.forEach((i) => {
  //             condition = condition  + '\'' + i + '\', ';
  //           });
  //           condition = condition.substr(0, condition.length - 2);
  //           s = ' where khu_vuc_tuyen in (' + condition + ')' ;
  //   } else {
  //     s = '';
  //   }
  //   console.log(s);
  //   const query = {
  //     query: 'Select * from ' + TableName.tuyendungTTCNTb + s,
  //   };
  //   return this.http.post(this.baseUrl + '/empCheckin', query);
  // }

  getItemFilterOfParticipant(status){
    const query = {
      query: 'Select * from ' + TableName.tuyendungTTCNTb + ' where status = ' + status,
    };
    console.log(query);
    return this.http.post(this.baseUrl + '/empCheckin', query);
  }
  getParList(str, status) {
    const arrResult: ReplaySubject<any> = new ReplaySubject<any>();
    this.getItemFilterOfParticipant(status).subscribe((res) => {
      if (res && Array.isArray(res)) {
        const arr = [];
        // @ts-ignore
        res.forEach((i) => {
          if (i[str]) {
            arr.push(i[str]);
          }
        });
        switch (str) {
          case 'email':
            arrResult.next({emailList: arr});
            break;
          case 'ho_va_ten':
            arrResult.next({nameList: arr});
            break;
          case 'chuyen_nganh':
            arrResult.next({majorList: arr});
            break;
          case 'quan_huyen_tam_tru':
            arrResult.next({addList: arr});
            break;
          case 'he_TN':
            arrResult.next({levelList: arr});
            break;
          case 'vi_tri_cong_viec':
            arrResult.next({vitriList: arr});
            break;
        }
      }
    });
    return arrResult;
  }
  getTestList(obj){
    let s = '';
    if (obj.branch !== '' && obj.typeExam){
      s = ' where chi_nhanh= \'' + obj.branch + ' \' and loai_de= \'' + obj.typeExam + '\'' ;
    }
    const query = {
      query: 'Select * from ' + this.dethiTb + s,
    };
    return this.http.post(this.baseUrl + '/empCheckin', query);
  }
  getSelectFilterItem(str){
    const content = {
      type: str
    };
    return this.http.post(this.baseUrl + '/thong_tin_emp', content);
  }
  getTestListNew(content){
    return this.http.post(this.baseUrl + '/get_exam_test', content);
  }
  chamDiemTest(content){
    return this.http.post(this.baseUrl + '/cham_diem_test', content);
  }
  async getGeneralInfoForParticipant(tableConfig, name?){
    if (name === 'ttcv' || name === 'other'){
      this.getUniversityList('ten_vi_tri').subscribe((res) => {
        tableConfig.columns.forEach((i) => {
          if (i.dataField === 'vi_tri_cong_viec' || i.dataField === 'vi_tri'){
            Object.assign(i, {options: res});
          }
        });
      });
    }
    if (name === 'ttcn' || name === 'other'){
      this.getUniversityList('ten_dan_toc').subscribe((res) => {
        tableConfig.columns.forEach((i) => {
          if (i.dataField === 'dan_toc'){
            Object.assign(i, {options: res});
          }
        });
      });
      this.getUniversityList('ten_cty').subscribe((res) => {
        tableConfig.columns.forEach((i) => {
          if (i.dataField === 'ten_cty_da_lam'){
            Object.assign(i, {options: res});
          }
        });
      });
    }
    if (name === 'edu' || name === 'other'){
      this.getUniversityList('ten_truong_hoc').subscribe((res) => {
        if (res) {
          tableConfig.columns.forEach((i) => {
            if (i.dataField === 'truong' || i.dataField === 'ten_truong') {
              Object.assign(i, {options: res});
            }
          });
        }
      });
      this.getUniversityList('ten_chuyen_nganh').subscribe((res) => {
        if (res) {
          tableConfig.columns.forEach((i) => {
            if (i.dataField === 'chuyen_nganh') {
              Object.assign(i, {options: res});
            }
          });
        }
      });
    }
    if (name === 'other'){
      const w = await this.addressService.allWard();
      if (w){
        tableConfig.columns.forEach((i) => {
          if (i.dataField === 'quan_huyen_tam_tru') {
            Object.assign(i, {options: w});
          }
        });
      }
      const dt = await this.empService.parentDepartList();
      if (dt){
        tableConfig.columns.forEach((i) => {
          if (i.dataField === 'khu_vuc_tuyen' || i.dataField === 'khu_vuc_nhan_viec') {
            Object.assign(i, {options: dt});
          }
        });
      }
    }
    if (name === 'pv'){
       const arr = await this.recruiterList();
       if (arr){
         tableConfig.columns.forEach((i) => {
           if (i.dataField === 'nguoi_pv_lan_1' || i.dataField === 'nguoi_pv_lan_2') {
             Object.assign(i, {options: arr});
           }
         });
       }

    }
    return tableConfig;
  }
  getBranchParticipant(value){
    const query = {
      query: 'Select * from ' + TableName.quanlyUngvienTb + ' where id_ung_vien=\'' + value + '\''
    };
    return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }
  checkParticipantInTable(email?, idInOtherTb?){
    let query;
    if (email){
      query = {
        query: 'Select * from ' + this.tuyendungTTCNTb + ' where email=\'' + email + '\'',
      };
    }else if (idInOtherTb){
      query = {
        query: 'Select * from ' + this.tuyendungTTCNTb + ' where id_ung_vien=\'' + idInOtherTb + '\'',
      };
    }

    return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }
  getInfoCurrentParticipant(str, id){
    let table;
    switch (str) {
      case 'ttcn': table = this.tuyendungTTCNTb; break;
    }
    const query = {
      query: 'Select * from ' + table + ' where id_ung_vien=\'' + id + '\'',
    };
    return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }
  async convertStringToDict(id) {
    const dt = await this.getInfoCurrentParticipant('ttcn', id);
    const changeObject = {
      trinh_do_hoc_van: [],
      kinh_nghiem_lam_viec: [],
      ngoai_ngu: [],
      chung_chi_chuyen_nganh: []
    };
    Object.keys(changeObject).forEach((str) => {
      const array = [];
      if (dt[0] && dt[0][str]) {
        const a = dt[0][str].split('//');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < a.length; i++) {
          let b = {};
          b = JSON.parse(a[i].replace(/'/g, '"'));
          array.push(b);
        }
      }
      changeObject[str] = array;
    });
    return changeObject;
  }
  // getInfoFromDanhGia(value){
  //   const query = {
  //       query: 'Select * from ' + this.danhgiaTb + ' where id_ung_vien=\'' + value + '\''
  //   };
  //   return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  // }

  getReportForRecruiter(value){
    return this.http.post(this.baseUrl + '/bao_cao_nguoi_phong_van_all', {email: value}).toPromise();
  }

  getReportForRecruiterDaily(content){
    return this.http.post(this.baseUrl + '/bao_cao_nguoi_phong_van_daily', content);
  }
  getNguoiPV(){
    const query = {
       query: 'Select email from ' + this.ngPvTb,
    };
    return this.http.post<any[]>(this.baseUrl + '/empCheckin', query).toPromise();
  }
  async recruiterList(){
    const dt = await this.getNguoiPV();
    const arr = [];
    dt.forEach((i) => {
        arr.push(i.email);
    });
    return arr;
  }

  roundPV(value?){
    let str;
    if (value){
      str = 'Select * from ' + this.vtcvTb + ' where ten_vi_tri = \'' + value + '\'';
    } else {
      str = 'Select distinct * from ' + this.vtcvTb;
    }
    const query = {
      query : str,
    };
    return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }

  getJobListInQuanLyTb(value?, pv1?, pv2?){
    let str = 'Select a.*, b.id_vi_tri from ' + this.tuyendungTTCNTb  + ' a inner join ' + this.vtcvTb + ' b on a.vi_tri_cong_viec = b.ten_vi_tri';
    if (value && pv1 === false && pv2 === false){
      str = str + ' where a.vi_tri_cong_viec = \'' + value + '\'';
    } else if (value && pv1 === true && pv2 === false){
      str = str + ' where a.vi_tri_cong_viec = \'' + value + '\' and a.ket_qua_pv_lan_1 = \'Đạt\'';
    } else if (value && pv1 === true && pv2 === true){
      str = str + ' where a.vi_tri_cong_viec = \'' + value + '\' and a.ket_qua_pv_lan_1 = \'Đạt\' and a.ket_qua_pv_lan_2 = \'Đạt\'';
    }  else if (!value && !pv1 && !pv2) {
      str = 'Select distinct a.khu_vuc_tuyen, a.vi_tri_cong_viec, b.id_vi_tri  from ' + this.tuyendungTTCNTb + ' a inner join ' + this.vtcvTb + ' b on a.vi_tri_cong_viec = b.ten_vi_tri';
    }
    const query = {
      query : str,
    };
    return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }

  async resultOfJobTitle(title){
    const obj = {
      lengthOfArr: 0,
      numberPV1: 0,
      numberPV2: 0,
    };
    const dt = await this.getJobListInQuanLyTb(title, false, false);
    if (dt){
      // @ts-ignore
      obj.lengthOfArr = dt.length;
    }
    const dt1 = await this.getJobListInQuanLyTb(title, true, false);
    if (dt1){
      // @ts-ignore
      obj.numberPV1 = dt1.length;
    }
    const dt2 = await this.getJobListInQuanLyTb(title, true, true);
    if (dt2){
      // @ts-ignore
      obj.numberPV2 = dt2.length;
    }
    return obj;
  }

  getInfoSentMail(id){
    return this.http.post(this.baseUrl + '/get_history_sendmail_tuyen_dung', {id_ung_vien: id});
  }

  getDetailVtcv(idvtr, khuvuc, pv1, pv2, trungtuyen, reject){
    let str = 'Select a.*, b.id_vi_tri from ' + this.participantTb  + ' a inner join ' + this.vtcvTb + ' b on a.vi_tri = b.ten_vi_tri';
    str = str + ' where b.id_vi_tri = ' + idvtr + ' and a.khu_vuc_tuyen = \'' + khuvuc + '\'';
    if (idvtr && khuvuc && pv1 === false && pv2 === false && trungtuyen === false ){
      str = str + 'and a.ket_qua_pv_lan_1 != \'Đạt\' and a.ket_qua_pv_lan_2 != \'Đạt\' and a.kq_pv_cuoi_cung != \'Đạt\'';
    } else if (idvtr && khuvuc && pv1 === true && pv2 === false && trungtuyen === false && reject === false){
      str = str +  ' and a.ket_qua_pv_lan_1 = \'Đạt\' and a.ket_qua_pv_lan_2 != \'Đạt\' and a.kq_pv_cuoi_cung != \'Đạt\'';
    } else if (idvtr && khuvuc && pv1 === true && pv2 === true && trungtuyen === false && reject === false){
      str = str +  ' and a.ket_qua_pv_lan_1 = \'Đạt\' and a.ket_qua_pv_lan_2 = \'Đạt\' and a.kq_pv_cuoi_cung != \'Đạt\'';
    } else if (idvtr && khuvuc && pv1 === true && pv2 === true && trungtuyen === true && reject === false){
      str = str +  ' and a.ket_qua_pv_lan_1 = \'Đạt\' and a.ket_qua_pv_lan_2 = \'Đạt\' and a.kq_pv_cuoi_cung = \'Đạt\'';
    } else if (idvtr && khuvuc && pv1 === true && pv2 === true && trungtuyen === true && reject === true){
      str = str +  ' and a.ket_qua_pv_lan_1 = \'Đạt\' and a.ket_qua_pv_lan_2 = \'Đạt\' and a.kq_pv_cuoi_cung = \'Đạt\'';
    }
    const query = {
      query : str,
    };
    return this.http.post(this.baseUrl + '/empCheckin', query);
  }
  getVtcvList(vtr, khuvuc, type){
    let str = 'Select a.*, b.* from ' + this.participantTb  + ' a inner join ' + this.tuyendungTTCNTb + ' b on a.id_ung_vien = b.id_ung_vien';
    str = str + ' where b.vi_tri_cong_viec = \'' + vtr + '\' and b.khu_vuc_tuyen = \'' + khuvuc + '\'';
    if (vtr && khuvuc ){
      switch (type){
        case 'test': str = str + 'and a.gio_test != \'\' and (a.ngay_pv_lan_1 = \'\' or a.ngay_pv_lan_1 is null)'; break;
        case 'pv1': str = str +  ' and a.ngay_pv_lan_1 != \'\' and (a.ngay_pv_lan_2 = \'\' or a.ngay_pv_lan_2 is null)'; break;
        case 'pv2': str = str +  ' and a.ngay_pv_lan_2 != \'\' and(a.kq_pv_cuoi_cung != \'Đạt\' or a.kq_pv_cuoi_cung is null)'; break;
        case 'trungtuyen': str = str +  ' and a.kq_pv_cuoi_cung = \'Đạt\''; break;
        case 'reject': str = str +  ' and a.kq_pv_cuoi_cung = \'Từ chối\'';
      }
    }
    const query = {
      query : str,
    };
    console.log(str);
    return this.http.post(this.baseUrl + '/empCheckin', query);
  }

  getInfoDataUngVien(str, cond, tableName, hasCheckbox?, info?, reset?){
    const arrResult: ReplaySubject<any> = new ReplaySubject(1);
    const content = {
      condition: cond,
      user_email: this.authService.getEmailUser(),
      name_table: tableName
    };
    this.dataService.selectDataTbFunction(str, content, reset).subscribe((res) => {
      let a;
      if (res) {
        a = res;
        if (hasCheckbox) {
          a.forEach((i) => {
            Object.assign(i, {checkbox: false});
          });
        }
        if (info) {
          a.forEach((i) => {
            Object.assign(i, {isOpen: 'closed'});
          });
        }
      } else {
        a = null;
      }
      arrResult.next(res);
    });
    return arrResult;
  }

  getDataComboBox(content) {
    return this.http.post<any>(this.baseUrl + '/data_format_recruitment', content);
  }

  addCandidate(content) {
    return this.http.post<any>(this.baseUrl + '/form_recruitment', content);
  }
}
