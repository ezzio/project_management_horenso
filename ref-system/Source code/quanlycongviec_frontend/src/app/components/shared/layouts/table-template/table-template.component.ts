import {
  Component, ContentChild,
  EventEmitter, HostListener,
  Input,
  OnInit,
  Output, TemplateRef,
} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportService} from '../../../../_services/file/export.service';
import {FilesService} from '../../../../_services/file/files.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../../../../environments/environment';
import {EmpService} from '../../../../_services/data/emp.service';
import {UserService} from '../../../../_services/data/user.service';
import {TableName} from '../../../../_models/constants/tableName';
import {AuthService} from '../../../../_services/auth/auth.service';
import {ConfirmationDialogService} from '../../confirmation-dialog/confirmation-dialog.service';
import {DataService} from '../../../../_services/data/data.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  readonly baseUrl = environment.backendUrl;
  public urlPath = environment.backendUrl + '/imgs/';
  public urlFilePath = environment.backendUrl + '/download_file/';
  @Input() buttonTicket: boolean;
  @Input() heightTable: string;
  @Input() colorText: string;
  @Input() keyDelete: any;
  @Input() tableName: string;
  @Input() editOrNot: boolean;
  @Input() deleteOrNot: boolean;
  @Input() plusButton: boolean;
  @Input() postOrNot: boolean;
  @Input() classOfDelete: any;
  @Input() public tableConfig: any;
  @Input() public tableContent: any;
  @Input() public inputComponent: any;
  @Input() public sizeModal = 'xl';
  @Input() public cvSize = 'xl';
  @Input() public isSuperAdmin = false;
  @Output() currentListEvent = new EventEmitter<any>();
  @Output() imagePathtEvent = new EventEmitter<any>();
  @Input() public tableConfigChosen: EventEmitter<object>;
  @Input() public tableContentChosen: EventEmitter<object>;
  @Input() isExport: boolean;
  @Input() isExportNV: boolean;
  @Input() isPagination = true;
  @Input() uploadImg = false;
  @Input() typeReport: string;
  @Input() queryInput: string;
  @Input() filterButton: false;
  @Input() detailSize = 'xl';
  @Input() okTicket: boolean;
  @Input() cancelTicket: boolean;
  public tableConfigResult: any;
  public tableContentResult: any;
  @Output() checkboxEvent = new EventEmitter<any>();
  @Output() selectItemEvent = new EventEmitter<any>();
  @Output() openEvent = new EventEmitter<any>();
  @Input() pEvent: EventEmitter<number>;
  @Input() p = 1;
  @Input() itemsPerPage = 10;
  file: File;
  superAdmin: any;
  valueCheck: boolean;
  pResult: number;
  parentDepartList: any;
  constructor(private modalService: NgbModal, private exportService: ExportService,
              private filesService: FilesService, private spinnerService: NgxSpinnerService,
              private empService: EmpService, private userService: UserService,
              private authService: AuthService, private confirmationDialogService: ConfirmationDialogService,
              private dataService: DataService, private router: Router
              ) {
  }
  async ngOnInit() {
    if (this.authService.getEmailUser()){
      // this.isUserRight();
    }
    this.checkTableConfig();
    this.parentDepartList = await this.empService.parentDepartList();
  }
  checkTableConfig() {
    if (this.tableConfigChosen) {
      this.tableConfigChosen.subscribe(event => {
        this.tableConfigResult = event;
        this.checkTableContent();
      });
    } else if (this.tableConfig) {
      this.tableConfigResult =  this.tableConfig;
      this.checkTableContent();
    }
    if (this.pEvent){
      this.pEvent.subscribe((evt) => {
        this.pResult = evt;
      });
    } else if (this.p){
      this.pResult = this.p;
    }
  }
  checkTableContent(){
    if (this.tableContentChosen) {
      this.tableContentChosen.subscribe(event => {
        this.tableContentResult = event;
        this.checkData();
      });
    } else if (this.tableContent) {
      this.tableContentResult = this.tableContent;
      this.checkData();
    }
  }
  checkData(){
  }
  functionEdit(obj?, index?) {
    const modalRef = this.modalService.open(this.inputComponent, {size: this.sizeModal, backdrop: 'static', centered: true});
    modalRef.componentInstance.obj = obj;
    // modalRef.componentInstance.isSuperAdmin = this.isSuperAdmin;
    modalRef.componentInstance.tbList = this.tableContentResult;
    modalRef.componentInstance.rightAdmin = this.superAdmin;
    modalRef.componentInstance.changeEvent?.subscribe((result) => {
      this.tableContentResult[index] = result;
      this.currentListEvent.emit(result);
    });
  }

  changeHieuLuc(obj) {
    const objUpdate = {
      hieu_luc: 0,
      tin_tuc_id: obj.tin_tuc_id
    };
    if (obj.hieu_luc === 1) {
      objUpdate.hieu_luc = 0;
    } else {
      objUpdate.hieu_luc = 1;
    }
    const content = {
      array: [objUpdate],
      user_email: this.authService.getEmailUser(),
      name_table: TableName.newsTb,
    };
    this.dataService.updateData(content).subscribe((res) => {
      console.log(res);
    });
    location.reload();
  }

  functionDelete(obj) {
    const content = {
      user_email: this.authService.getEmailUser(),
      id_table: obj[this.keyDelete],
      name_table: this.tableName
    };
    this.confirmationDialogService
      .confirm('Xác nhận', 'Bạn có chắc chắn xoá dữ liệu này không? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.dataService.deleteData(content).subscribe((res) => {
            console.log(res);
            // @ts-ignore
            if (res.result && res.result === 'OK') {
              Swal.fire('Hoàn tất', 'Xoá thành công', 'success');
              this.tableContentResult = this.tableContentResult.filter(
                (item) => item !== obj
              );
            } else {
              Swal.fire('Lỗi', 'Xoá thất bại', 'error');
            }
          }, error => {
            Swal.fire('Lỗi', 'Xoá thất bại', 'error');
          });
        }
      });
  }

  removeItem(o) {
    this.tableContentResult = this.tableContentResult.filter(
      (item) => item !== o
    );
    this.currentListEvent.emit(this.tableContentResult);
  }

  export() {
    this.dataService.exportBCFunction(this.queryInput, this.tableName);
  }

  exportNV() {
    this.dataService.exportNVFunction(this.typeReport, this.queryInput);
  }

  async upload(obj, event) {
    this.file = event.target.files[0];
    const objFile = {
      date: obj.ngay_cap_the_ATLD.replace(/\//g, ''),
      code: obj.emp_code
    };
    this.spinnerService.show();
    const dt = await this.filesService.uploadImage(objFile.code, objFile.date, 'pdf', this.file);
    // @ts-ignore
    if (dt.filepath) {
      // @ts-ignore
      obj.hinh_anh_the_chung_nhan = dt.filepath;
      this.imagePathtEvent.emit(obj);
    }
    this.spinnerService.hide();
  }
  openDetail(obj, typeData, component){
    const modalRef = this.modalService.open(component, {size: this.detailSize, backdrop: 'static' });
    modalRef.componentInstance.typeData = typeData;
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.changeEvent?.subscribe((result) => {
      this.tableContentResult.forEach((i, index) => {
        if (i.id_ung_vien === result.id_ung_vien){
          this.tableContentResult[index] = result;
        }
      });
    });
  }
  print(el) {
    this.spinnerService.show();
    this.router.navigateByUrl(el.routeTicket + '/' + el.task_time).then(() => {
      setTimeout(() => this.spinnerService.hide(), 3000);
      setTimeout(() => window.print(), 3200);
    });
  }
  openCV(obj, component){
    const modalRef = this.modalService.open(component, {size: this.cvSize, backdrop: 'static' });
    modalRef.componentInstance.objCurrent = obj;
  }
  // isUserRight() {
  //   this.userService.getUserRightAll().subscribe((res) => {
  //     this.superAdmin = res.superAdmin;
  //   });
  // }
  sendMail(obj, component){
    const modalRef = this.modalService.open(component, {size: this.detailSize, backdrop: 'static' });
    modalRef.componentInstance.objCurrent = obj;
  }
  trackByFn(index, item) {
    return index;
  }
  sendMailTicket(){

  }
  checkEvent(obj, e){
    obj.checkbox = e.currentTarget.checked;
    this.checkboxEvent.emit({obj, value: obj.checkbox});
  }
  openInfo(value){
    this.openEvent.emit({value, opened: 'opened'});
  }
}
