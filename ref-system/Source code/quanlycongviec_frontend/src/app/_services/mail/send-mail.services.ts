import {Injectable} from '@angular/core';
import {CreateHTML} from '../../_models/classes/createHTML';
import {MailService} from './mail.services';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {ConfirmationDialogService} from '../../components/shared/confirmation-dialog/confirmation-dialog.service';
import {environment} from '../../../environments/environment';
import {CreateHTMLForTuyendung} from '../../_models/classes/createHTMLForTuyendung';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {TableName} from '../../_models/constants/tableName';
import {DataService} from '../data/data.service';
import {GeneralService} from '../data/general.service';
import {ParticipantService} from '../data/participant.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class SendMailServices {
  readonly baseUrl = environment.backendUrl;

  constructor(private mailService: MailService, private toastrService: ToastrService,
              private spinnerService: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService,
              private http: HttpClient, private authService: AuthService, private generalService: GeneralService,
              private dataService: DataService, private participantService: ParticipantService) {
  }

  public sendMail(typeMail: string, taskTime: string, tableContent: any, tableConfig: any, tableListContent?: any, tableListConfig?: any) {
    const dynamicTemplate = new CreateHTML(typeMail, tableContent, tableConfig, tableListContent, tableListConfig);
    const dynamicTemplateParsed = dynamicTemplate.getDynamicTemplate();
    const htmlContent = dynamicTemplateParsed;
    const body = {
      task_time: taskTime,
      type: typeMail,
      html: htmlContent,
      action: 'accept'
    };
    this.confirmationDialogService
      .confirm('Xác nhận', 'Xác nhận gửi mail? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.spinnerService.show();
          this.mailService.sendOfficeMail(body).subscribe((res) => {
            console.log(res);
            if (res.task_id) {
              Swal.fire('Hoàn tất', 'Gửi mail thành công', 'success');
              location.reload();
            } else {
              Swal.fire('Lỗi', 'Gửi mail thất bại', 'error');
            }
            this.spinnerService.hide();
          });
        }
      });
  }

  public rejectMail(taskTime: string, typeTicket: string) {
    const body = {
      task_time: taskTime,
      type: typeTicket,
      action: 'reject'
    };
    this.confirmationDialogService
      .confirm('Xác nhận', 'Xác nhận từ chối đơn xin duyệt chi? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.spinnerService.show();
          this.mailService.sendOfficeMail(body).subscribe((res) => {
            console.log(res);
            if (res.task_id) {
              this.toastrService.success('Từ chối thành công');
              location.reload();
            } else {
              this.toastrService.error('Từ chối thất bại');
            }
            this.spinnerService.hide();
          });
        }
      });
  }
  sendMailCareer(content){
    return this.http.post(this.baseUrl + '/sendmail_tuyen_dung', content);
  }
  sendMailCareerFunction(typeData, newValue, emailSender, numSentMail?){
    const numberEvent: ReplaySubject<any> = new ReplaySubject(1);
    console.log(newValue);
    this.confirmationDialogService
      .confirm('Xác nhận', 'Xác nhận lưu thông tin và gửi mail? ')
      .then((confirmed) => {
        if (confirmed === true) {
          const content = {
            email: '',
            address: '',
            hour_pv: '',
            day_pv: '',
            type: '0',
            email_sender: this.authService.getEmailUser()
          };
          switch (typeData) {
            case 'test':
              content.email = emailSender;
              content.hour_pv = newValue.gio_test;
              content.day_pv = newValue.ngay_test;
              content.type = '0';
              content.address = newValue.dia_chi_test;
              break;
            case 'pv1':
              content.email = emailSender;
              content.hour_pv = newValue.gio_pv_lan_1;
              content.day_pv = newValue.ngay_pv_lan_1;
              content.type = '1';
              content.address = newValue.dia_chi_pv_1;
              break;
            case 'pv2':
              content.email = emailSender;
              content.hour_pv = newValue.gio_pv_lan_2;
              content.day_pv = newValue.ngay_pv_lan_2;
              content.type = '2';
              content.address = newValue.dia_chi_pv_2;
              break;
            case 'trungtuyen':
              content.email = emailSender;
              content.hour_pv = newValue.gio_nhan_viec;
              content.day_pv = newValue.ngay_nhan_viec;
              content.type = '3';
              content.address = newValue.dia_chi_nhan_viec;
          }
          this.editDataUngvien(false, typeData, newValue).subscribe((dt) => {
            if (dt.success){
              console.log(content);
              this.sendMailCareer(content).subscribe((res) => {
                console.log(res);
                // @ts-ignore
                if (res) {
                  // @ts-ignore
                  if (res.result && res.result === 'OK') {
                    Swal.fire('Hoàn tất!', 'Gửi mail thành công', 'success');
                    if (numSentMail){
                      numSentMail = numSentMail + 1;
                      numberEvent.next(numSentMail);
                    }
                  } else  {
                    Swal.fire('Lỗi', 'Gửi mail thất bại', 'error');
                  }
                } else {
                  Swal.fire('Lỗi', 'Gửi mail thất bại', 'error');
                }
                this.spinnerService.hide();
              }, error => {
                this.spinnerService.hide();
              });
            } else {
              Swal.fire('Lỗi', 'Thay đổi dữ liệu và gửi mail thất bại', 'error');
            }
            this.spinnerService.hide();
          });
        }
      });
    return numberEvent;
  }
  editDataUngvien(edit: boolean, typeData, newValue, resetPoint?) {
    console.log(typeData);
    const result: ReplaySubject<any> = new ReplaySubject(1);
    let msg;
    if (newValue.gio_pv_lan_1 && newValue.gio_pv_lan_1.length < 8) {
      newValue.gio_pv_lan_1 = newValue.gio_pv_lan_1 + ':00';
    }
    if (newValue.gio_test && newValue.gio_test.length < 8) {
      newValue.gio_test = newValue.gio_test + ':00';
    }
    if (resetPoint) {
      newValue.diem_bai_test = '';
      newValue.ket_qua_test = '';
      newValue.have_test = 0;
    }
    const content = {
      array: [newValue],
      user_email: this.authService.getEmailUser(),
      name_table: TableName.quanlyUngvienTb
    };
    console.log(content);
    if (typeData === 'pv1' || typeData === 'pv2' || typeData === 'test'){
      this.spinnerService.show();
      this.dataService.updateData(content).subscribe(async (res) => {
        console.log(res);
        if (res.result && res.result.status === 1) {
          msg = {success: res.result.msg};
          if (edit){
            Swal.fire('Hoàn tất', res.result.msg, 'success');
          }
        } else {
          msg = {error: res.result.msg};
          if (edit){
            Swal.fire('Lỗi', res.result.msg, 'error');
          }
        }
        result.next(msg);
        this.spinnerService.hide();
      }, error => {
        if (edit){
          Swal.fire('Lỗi', 'Cập nhập thất bại!', 'error');
        }
        msg = {error: 'Cập nhập thất bại!'};
        result.next(msg);
        this.spinnerService.hide();
      });
    } else {
      msg = {success: 'ok'};
      result.next(msg);
    }
    return result;
  }
}
