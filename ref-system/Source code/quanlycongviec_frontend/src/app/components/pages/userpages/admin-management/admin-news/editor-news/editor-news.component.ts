import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NewsItem, TableNews, TablePNCNews} from '../../../../../../_models/constants/element/newsItem';
import {AuthService} from '../../../../../../_services/auth/auth.service';
import {DataService} from '../../../../../../_services/data/data.service';
import {TableName} from '../../../../../../_models/constants/tableName';
import { FilesService } from 'src/app/_services/file/files.service';
import {environment} from '../../../../../../../environments/environment';
import { ConfirmationDialogService } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import * as QuillNamespace from 'quill';
const Quill = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import ImageCompress from 'quill-image-compress';
import {Tab} from '@syncfusion/ej2-angular-navigations';
import Swal from 'sweetalert2/dist/sweetalert2.js';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageCompress', ImageCompress);
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editor-news',
  templateUrl: './editor-news.component.html',
  styleUrls: ['./editor-news.component.css'],
})
export class EditorNewsComponent implements OnInit {
  @ViewChild('quillFile') quillFileRef: ElementRef;
  content: any;
  editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image']
      ],
    },
    imageResize: true,
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      debug: true, // default
    }
  };
  ofMytinpnc = '0';
  readonly baseUrl = environment.redirectUrl;
  datePost: any;
  userEmail: any;
  constructor( private authService: AuthService, private dataService: DataService,
               private filesService: FilesService, private confirmationDialogService: ConfirmationDialogService,
               private toastrService: ToastrService, private spinnerService: NgxSpinnerService) {
    this.datePost = new Date();
    this.userEmail = this.authService.getEmailUser();
  }
  options = {};
  box: FormControl;
  elementContent = NewsItem;
  formConfig = TableNews.columns;
  formConfigPNC = TablePNCNews.columns;
  ngOnInit() {
    this.box = new FormControl('');
    let nameFile = new Date().toLocaleString().replace(',', '');
    nameFile = nameFile.replace(/\//g, '');
    nameFile = nameFile.replace(/:/g, '');
    nameFile = nameFile.replace(/ /g, '');
    this.elementContent.tin_tuc_id = nameFile;
  }
  get checkEmail() {
    const arr = ['phuongnam.linhtd1@fpt.net', 'phuongnam.thytnt@fpt.net'];
    if (arr.includes(this.userEmail.toLowerCase())){
      return true;
    } else {
      return false;
    }
  }
  get userName(){
    return this.authService.getUsername();
  }
  receiveFormEvent(e){
    const key = Object.keys(e)[0];
    this.elementContent[key] = e[key];
    if (key === 'noi_bo' && e[key] === 'Nội bộ'){
      this.elementContent[key] = 1;
    } else if (key === 'noi_bo' && e[key] === 'Công khai'){
      this.elementContent[key] = 0;
    }
    this.separateNews();
  }
  async receiveImage(e){
    const index = e.name.lastIndexOf('.');
    const a = e.name.substr(index + 1);
    const dt = await this.filesService.uploadImageGeneral('news', this.elementContent.tin_tuc_id, a, e);
    console.log(dt);
    // @ts-ignore
    if (dt.filepath){
      // @ts-ignore
      this.elementContent.hinh_anh = dt.filepath;
    }
  }
  async receive2Image(e){
    const index = e.name.lastIndexOf('.');
    const a = e.name.substr(index + 1);
    const dt = await this.filesService.upload2ImageGeneral('news', a, e);
    console.log(dt);
    // @ts-ignore
    if (dt.result.uuid){
      // @ts-ignore
      this.elementContent.hinh_anh = dt.result.uuid;
    }
  }
  separateNews(){
    if (this.elementContent.chi_nhanh === 'TIN' && this.elementContent.noi_bo === 1) {
      this.elementContent.link = this.baseUrl + '/truyenthong/news/mobile/tin/' + this.elementContent.tin_tuc_id;
    } else if (this.elementContent.chi_nhanh === 'PNC' && this.elementContent.noi_bo === 1) {
      this.elementContent.link = this.baseUrl + '/truyenthong/news/mobile/pnc/' + this.elementContent.tin_tuc_id;
    } else if (this.elementContent.noi_bo === 0) {
      this.elementContent.link = this.baseUrl + '/truyenthong/news/mobile/general/' + this.elementContent.tin_tuc_id;
    }
  }
  onSubmit(){
    if (this.ofMytinpnc === '0'){
      this.onMyTin();
    } else {
      this.onPNSubmit();
    }
  }
  onMyTin(){
    let objAdd;
    this.elementContent.tac_gia = this.authService.getUsername();
    this.elementContent.hieu_luc = 1;
    this.elementContent.noi_dung = this.content;
    if (this.ofMytinpnc === '0'){
      objAdd = {
        array: [this.elementContent],
        user_email: this.authService.getEmailUser(),
        name_table: TableName.newsTb
      };
    }
    this.confirmationDialogService
      .confirm('Xác nhận', 'Xác nhận đăng bài? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.spinnerService.show();
          this.dataService.addData(objAdd).subscribe((res) => {
            if (res.result.msg && res.result.msg === 'OK'){
              this.spinnerService.hide();
              Swal.fire('Hoàn tất', 'Đăng bài thành công!', 'success');
            } else {
              setTimeout(() => {
                this.spinnerService.hide();
              }, 5000);
              this.toastrService.error('Đăng bài thất bại!');
            }
          }, error => {
            setTimeout(() => {
              this.spinnerService.hide();
            }, 5000);
            Swal.fire('Lỗi', 'Đăng bài thất bại!', 'error');
          });
        }
      })
      .catch(error => {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 5000);
        Swal.fire('Lỗi', 'Đăng bài thất bại!', 'error');
      });
  }
  onPNSubmit(){
    let objAdd;
    this.elementContent.tac_gia = this.authService.getUsername();
    this.elementContent.hieu_luc = 1;
    this.elementContent.noi_dung = this.content;
    this.elementContent.link =  'https://phuongnamtelecom.vn/truyenthong/news/mobile/general/' + this.elementContent.tin_tuc_id;
    if (this.ofMytinpnc === '1') {
      objAdd = {
        array: [this.elementContent],
        user_email: this.authService.getEmailUser(),
        name_table: 'tin_tuc_phuongnamtelecom'
      };
    }
    console.log(objAdd);
    this.confirmationDialogService
      .confirm('Xác nhận', 'Xác nhận đăng bài? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.spinnerService.show();
          this.dataService.addDataNew(objAdd).subscribe((res) => {
            console.log(res);
            if (res.result && res.result.status === 1){
              this.spinnerService.hide();
              Swal.fire('Hoàn tất', 'Đăng bài thành công!', 'success');
            } else {
              setTimeout(() => {
                this.spinnerService.hide();
              }, 5000);
              Swal.fire('Lỗi', 'Đăng bài thất bại!', 'error');
            }
          }, error => {
            setTimeout(() => {
              this.spinnerService.hide();
            }, 5000);
            Swal.fire('Lỗi', 'Đăng bài thất bại!', 'error');
          });
        }
      })
      .catch(error => {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 5000);
        Swal.fire('Lỗi', 'Đăng bài thất bại!', 'error');
      });

  }
}
