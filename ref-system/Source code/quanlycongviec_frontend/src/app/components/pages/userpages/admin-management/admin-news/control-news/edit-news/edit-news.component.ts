import { Component, OnInit } from '@angular/core';
import { TableNews} from '../../../../../../../_models/constants/element/newsItem';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TableName} from '../../../../../../../_models/constants/tableName';
import { ConfirmationDialogService } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.service';
import {ToastrService} from 'ngx-toastr';
import { DataService } from 'src/app/_services/data/data.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FilesService } from 'src/app/_services/file/files.service';
import * as _ from 'lodash';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  elementContent: any;
  obj: any;
  formConfig = TableNews.columns;
  contentHtml: any;
  isShowSaveBtn: boolean;
  constructor(public activeModal: NgbActiveModal, private confirmationDialogService: ConfirmationDialogService,
              private toastrService: ToastrService, private dataService: DataService,
              private authService: AuthService, private filesService: FilesService,
              private spinnerService: NgxSpinnerService) { }

  async ngOnInit() {
    if (this.obj.noi_bo === 1){
      this.obj.noi_bo = 'Nội bộ';
    } else {
      this.obj.noi_bo = 'Công khai';
    }
    this.elementContent = this.obj;
    const dt = await this.dataService.asyncConvertToBase64({mode: 'convert_str', link: this.obj.noi_dung});
    this.contentHtml = dt.result;
  }
  save(){
    const obj = _.omit(this.elementContent, 'hieu_luc');
    const objAdd = {
      array: [obj],
      user_email: this.authService.getEmailUser(),
      name_table: TableName.newsTb
    };
    this.confirmationDialogService
      .confirm('Xác nhận', 'Xác nhận cập nhập bài viết? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.spinnerService.show();
          this.dataService.updateData(objAdd).subscribe((res) => {
            if (res.result && res.result === 'OK'){
              this.spinnerService.hide();
              this.toastrService.success('Cập nhập thành công!');
            } else {
              setTimeout(() => {
                this.spinnerService.hide();
              }, 5000);
              this.toastrService.error('Cập nhập thất bại!');
            }
          });
        }
      })
      .catch(error => {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 5000);
        this.toastrService.error('Đăng bài thất bại!');
      });
  }
  receiveForm(e){
    const key = Object.keys(e)[0];
    this.elementContent[key] = e[key];
  }
  async receiveImg(e){
    const index = e.name.lastIndexOf('.');
    const a = e.name.substr(index + 1);
    const dt = await this.filesService.uploadImageGeneral('news', this.elementContent.tin_tuc_id, a, e);
    // @ts-ignore
    if (dt.filepath){
      // @ts-ignore
      this.elementContent.hinh_anh = dt.filepath;
    }
  }
  receiveRichText(e){
    console.log(e);
    if (e){
      this.elementContent.noi_dung = e;
      this.isShowSaveBtn = true;
    } else {
      this.isShowSaveBtn = false;
    }
  }
  close(){
    this.activeModal.close();
  }
}
