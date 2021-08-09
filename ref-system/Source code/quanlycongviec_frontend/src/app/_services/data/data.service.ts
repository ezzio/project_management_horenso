import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ConfirmationDialogComponent} from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService} from '../../components/shared/confirmation-dialog/confirmation-dialog.service';
import {TableName} from '../../_models/constants/tableName';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly baseUrl = environment.backendUrl;
  public data = {};
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor(
    private http: HttpClient, private toastrService: ToastrService,
    private authService: AuthService, private spinnerService: NgxSpinnerService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  deleteData(content) {
    return this.http.post(this.baseUrl + '/delete_row_table', content);
  }

  addData(content) {
    return this.http.post<any>(this.baseUrl + '/add_data_table', content);
  }

  addDataNew(content) {
    return this.http.post<any>(this.baseUrl + '/add_data_table_new', content);
  }

  addAwaitData(content) {
    return this.http.post<any>(this.baseUrl + '/add_data_table', content).toPromise();
  }

  updateData(content) {
    return this.http.post<any>(this.baseUrl + '/update_data_table', content);
  }

  deleteDataFunction(content) {
    let msg;
    const arrResult: ReplaySubject<any> = new ReplaySubject(1);
    this.confirmationDialogService
      .confirm('Xác nhận', 'Bạn có chắc chắn xoá dữ liệu này không? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.deleteData(content).subscribe((res) => {
            console.log(res);
            // @ts-ignore
            if (res.result && res.result === 'OK') {
              msg = {success: 'Xoá thành công'};
              Swal.fire('Hoàn tất', 'Xoá thành công', 'success');
            } else {
              msg = {error: 'Xoá thất bại'};
              Swal.fire('Lỗi', 'Xoá thất bại', 'error');
            }
          }, error => {
            msg = {error: 'Xoá thất bại'};
            Swal.fire('Lỗi', 'Xoá thất bại', 'error');
          });
          arrResult.next(msg);
        }
      });
    return arrResult;
  }

  updateDataFunction(content) {
    const arrResult: ReplaySubject<any> = new ReplaySubject(1);
    let msg;
    this.updateData(content).subscribe((res) => {
      console.log(res);
      if (res.result) {
        const r = res.result;
        if (r.status === 1) {
          msg = {success: r.msg};
          Swal.fire('Hoàn thành', r.msg, 'success');
        } else {
          msg = {error: r.msg};
          Swal.fire('Lỗi', r.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Thay đổi thất bại', 'error');
        msg = {error: 'error'};
      }
      arrResult.next(msg);
      this.spinnerService.hide();
    }, error => {
      Swal.fire('Lỗi', 'Thay đổi thất bại', 'error');
      msg = {error: 'error'};
      arrResult.next(msg);
      this.spinnerService.hide();
    });
    return arrResult;
  }

  convertToBase64(link) {
    return this.http.post<any>(this.baseUrl + '/convert_img_base64', link);
  }

  asyncConvertToBase64(link) {
    return this.http.post<any>(this.baseUrl + '/convert_img_base64', link).toPromise();
  }

  exportReport(content) {
    return this.http.post<any>(this.baseUrl + '/bao_cao_chi_tiet', content);
  }

  exportReportNV(content) {
    // @ts-ignore
    return this.http.post<any>(this.baseUrl + '/bao_cao_nghiep_vu', content);
  }

  exportReportNV2(content) {
    // @ts-ignore
    return this.http.post<any>(this.baseUrl + '/bao_cao_nghiep_vu', content, {responseType: 'text'});
  }

  exportBCFunction(queryInput, tableName) {
    this.spinnerService.show();
    const content = {
      query: queryInput,
      user_email: this.authService.getEmailUser(),
      name_table: tableName
    };
    this.exportReport(content).subscribe((res) => {
      this.storeFile(res.result);
    }, error => {
      Swal.fire('Lỗi', 'Lỗi xuất báo cáo!', 'error');
    });
    this.spinnerService.hide();
  }

  exportNVFunction(typeReport, queryInput, viewOrSave?, typeR?) {
    const loading: ReplaySubject<boolean> = new ReplaySubject(1);
    const arrResult: ReplaySubject<any> = new ReplaySubject(1);
    const content = {
      type: typeReport,
      input: queryInput,
      option: viewOrSave,
      type_of_report: typeR,
      user_email: this.authService.getEmailUser()
    };
    if (viewOrSave === 'save') {
      this.exportReportNV(content).subscribe((res) => {
        // @ts-ignore
        if (res && res.result && res.result.status === 1 && res.result.detail && res.result.detail.data_save !== '') {
          this.storeFile(res.result.detail.data_save);
          loading.next(false);
        } else {
          Swal.fire('Lỗi', 'Lỗi xuất báo cáo!', 'error');
        }
      }, error => {
        Swal.fire('Lỗi', 'Lỗi xuất báo cáo!', 'error');
        this.spinnerService.hide();
        loading.next(false);
      });
      return loading;
    } else if (viewOrSave === 'view') {
      this.spinnerService.show();
      this.exportReportNV2(content).subscribe((res) => {
        // @ts-ignore
        if (res) {
          // tslint:disable-next-line:no-eval
          const data = eval('(' + res + ')');
          if (data.result && data.result.status === 1 && data.result.detail) {
            arrResult.next(this.convertDateToRightFormat(data.result.detail.data_view));
          } else {
            Swal.fire('Lỗi', 'Không có thông tin!', 'error');
          }
        } else {
          Swal.fire('Lỗi', 'Không có thông tin!', 'error');
          arrResult.next([]);
        }
        this.spinnerService.hide();
      }, error => {
        Swal.fire('Lỗi', 'Lỗi xem thông tin!', 'error');
        arrResult.next([]);
        this.spinnerService.hide();
      });
      return arrResult;
    }
  }

  convertDateToRightFormat(dt) {
    const arr = [];
    if (dt) {
      const arrDataField = Object.keys(dt);
      const arrObj = Object.keys(dt[arrDataField[0]]);
      arrObj.forEach((i) => {
        const obj = {};
        arrDataField.forEach((key) => {
          Object.assign(obj, {[key]: dt[key][i]});
        });
        arr.push(obj);
      });
    }
    return arr;
  }

  storeFile(pathFile) {
    if (pathFile) {
      this.spinnerService.hide();
      this.confirmationDialogService
        .confirm('Xác nhận', 'Xác nhận lưu file? ')
        .then((confirmed) => {
          if (confirmed === true) {
            window.location.href = this.baseUrl + '/reports/' + pathFile;
          }
        });
    } else {
      this.spinnerService.hide();
      Swal.fire('Lỗi', 'Lỗi xuất báo cáo!', 'error');
    }
  }

  addNewDataFunction(objUpdate) {
    console.log(objUpdate);
    this.spinnerService.show();
    const resultAdd: ReplaySubject<any> = new ReplaySubject(1);
    console.log(objUpdate);
    this.addDataNew(objUpdate).subscribe((res) => {
      console.log(res);
      let resultUpdate = {
        count_insert: 0,
        count_update: 0
      };
      const result = res.result;
      if (result) {
        if (result.status === 1) {
          Swal.fire('Thành công', result.msg, 'success');
          resultUpdate =
            {
              count_insert: result.detail.count_insert,
              count_update: result.detail.count_update
            };
        } else {
          Swal.fire('Lỗi', result.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Cập nhập thất bại!', 'error');
      }
      resultAdd.next(resultUpdate);
      this.spinnerService.hide();
    }, error => {
      Swal.fire('Lỗi', 'Cập nhập thất bại!', 'error');
      this.spinnerService.hide();
    });
    return resultAdd;
  }

  selectDataTable(content) {
    return this.http.post<any>(this.baseUrl + '/select_data_table', content);
  }

  notifyAfterImport(content) {
    return this.http.post<any>(this.baseUrl + '/notify_after_import', content);
  }

  flipbookData() {
    const q = {
      query: 'Select * from ' + TableName.flipbookTb,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // We send JSON
      }),
    };
    // @ts-ignore
    return this.http.post(this.baseUrl + '/empCheckin', q, httpOptions);
  }

  selectDataTbFunction(str, content, reset?) {
    this.spinnerService.show();
    const arrResult: ReplaySubject<any> = new ReplaySubject(1);
    let arr;
    console.log(content);
    this.selectDataTable(content).subscribe((res) => {
      console.log(res);
      if (res.result) {
        const dt = res.result;
        if (dt.status && dt.status === 1) {
          if (str === 'view' || str === 'viewLength' && dt.detail && dt.detail.data) {
            arr = dt.detail.data;
          } else if (str === 'save' && dt.detail && dt.detail.file_name) {
            this.storeFile(dt.detail.file_name);
          }
        } else {
          if (!reset && str !== 'viewLength') {
            Swal.fire('Lỗi', dt.msg, 'error');
          }
        }
      } else {
        if (str !== 'viewLength'){
          Swal.fire('Lỗi', 'Lỗi xem thông tin', 'error');
        }
      }
      arrResult.next(arr);
      this.spinnerService.hide();
    }, error => {
      if (str !== 'viewLength'){
        Swal.fire('Lỗi', 'Lỗi xem thông tin', 'error');
      }
      this.spinnerService.hide();
    });
    return arrResult;
  }

  getChinhanhFromVungTracking(str, e) {
    let query;
    if (Array.isArray(e)){
      console.log(e);
      let condition = '';
      e.forEach((i) => {
        condition = condition + '\"' + i + '\"' + ', ';
      });
      condition = condition.substr(0, condition.length - 2);
      if (str === 'vung') {
        query = {
          query: 'Select distinct chi_nhanh from ' + TableName.infoBlockTb + ' where vung in (' + condition + ' )',
        };
      } else if (str === 'chi_nhanh') {
        query = {
          query: 'Select distinct block_name from ' + TableName.infoBlockTb + ' where chi_nhanh in (' + condition + ')',
        };
      } else if (str === 'block') {
        query = {
          query: 'Select distinct MBN_account_name from ' + TableName.accountTb + ' where block_name in (' + condition + ')',
        };
      }
    } else {
      if (str === 'vung') {
        query = {
          query: 'Select distinct chi_nhanh from ' + TableName.infoBlockTb + ' where vung = \'' + e + '\'',
        };
      } else if (str === 'chi_nhanh') {
        query = {
          query: 'Select distinct block_name from ' + TableName.infoBlockTb + ' where chi_nhanh = \'' + e + '\'',
        };
      } else if (str === 'block') {
        query = {
          query: 'Select distinct MBN_account_name from ' + TableName.accountTb + ' where block_name = \'' + e + '\'',
        };
      }
    }
    return this.http.post(this.baseUrl + '/empCheckin', query);
  }

  ketquabinhchon(email) {
    return this.http.post(this.baseUrl + '/ket_qua_binh_chon', {user_email: email});
  }

  thongtinbinhchon(email) {
    return this.http.post(this.baseUrl + '/thong_tin_binh_chon', {user_email: email});
  }

  gamedhbcgetresulthientai(email, type: number) {
    const content = {
      email,
      type
    };
    return this.http.post(this.baseUrl + '/game_dhbc_get_result_hien_tai', content);
  }

  gameDhbcGetQuestion(content) {
    return this.http.post(this.baseUrl + '/game_dhbc_get_question_hien_tai', content);
  }


}
