import {
  Component, ComponentFactoryResolver,
  EventEmitter, HostListener,
  Input,
  OnInit,
  Output,
  ViewChild, ViewContainerRef
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
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AtldClass} from '../../../../_models/classes/element/atldItem';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-mat-table-template',
  templateUrl: './mat-table-template.component.html',
  styleUrls: ['./mat-table-template.component.css']
})
export class MatTableTemplateComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() readmore: boolean;
  public dataLength: number;
  readonly baseUrl = environment.backendUrl;
  public urlPath = environment.backendUrl + '/imgs/';
  public urlFilePath = environment.backendUrl + '/download_file/';
  @Input() customStickyClass: string;
  @Input() keyDelete: any;
  @Input() tableName: string;
  @Input() editOrNot: boolean;
  @Input() deleteOrNot: boolean;
  @Input() isPaginator = true;
  @Input() plusButton: boolean;
  @Input() postOrNot: boolean;
  @Input() isCheckboxDuyet: boolean;
  @Input() classOfDelete: any;
  @Input() public tableConfig: any;
  @Input() public tableContent: any;
  @Input() public inputComponent: any;
  @Input() public sizeModal = 'xl';
  @Input() public isSuperAdmin = false;
  @Output() currentListEvent = new EventEmitter<any>();
  @Output() filteredListEvent = new EventEmitter<any>();
  @Output() imagePathtEvent = new EventEmitter<any>();
  @Input() public tableConfigChosen: EventEmitter<object>;
  @Input() public tableContentChosen: EventEmitter<object>;
  @Input() isExport: boolean;
  @Input() isExportNV: boolean;
  @Input() buttonTicket: boolean;
  @Input() uploadImg = false;
  @Input() typeReport: string;
  @Input() queryInput: string;
  @Input() filterButton: false;
  @Input() isResult: boolean;
  @Input() routeTicket: any;
  @Input() pageSize = 10;
  @Output() openDetailEvent = new EventEmitter<any>();
  public tableConfigResult: any;
  public tableContentResult: any;
  dataSource = new MatTableDataSource();
  displayedColumns = [];
  p = 1;
  @Input() itemsPerPage = 10;
  file: File;
  superAdmin: any;
  filterValues = {};
  filterSelectObj = [];
  selection: any[];
  checkAll: boolean;
  arrUpdate = [];
  contentFiltered: any;

  constructor(private modalService: NgbModal, private exportService: ExportService,
              private filesService: FilesService, private spinnerService: NgxSpinnerService,
              private empService: EmpService, private userService: UserService,
              private authService: AuthService, private confirmationDialogService: ConfirmationDialogService,
              private dataService: DataService, private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    // this.isUserRight();
    this.checkTableConfig();
  }

  checkTableConfig() {
    if (this.tableConfigChosen) {
      this.tableConfigChosen.subscribe(event => {
        this.tableConfigResult = event;
        this.getThCol();
        this.checkTableContent();
      });
    } else if (this.tableConfig) {
      this.tableConfigResult = this.tableConfig;
      this.getThCol();
      this.checkTableContent();
    }
  }

  checkTableContent() {
    if (this.tableContentChosen) {
      this.tableContentChosen.subscribe(event => {
        this.tableContentResult = event;
        this.contentFiltered = this.tableContentResult;
        this.getTableConfigResult();
      });
    } else if (this.tableContent) {
      this.tableContentResult = this.tableContent;
      this.contentFiltered = this.tableContentResult;
      this.getTableConfigResult();
    }
  }

  getTableConfigResult() {
    this.filterSelectObj = [];
    if (this.tableContentResult && this.tableContentResult.length > 0) {
      this.tableContentResult.forEach((i) => {
        if (i.recorded === 'OK') {
          i.checkValue = true;
        } else {
          i.checkValue = false;
        }
      });
      this.dataSource.data = this.tableContentResult;
      this.dataLength = this.tableContentResult.length;
    }
    if (this.tableConfigResult && this.tableConfigResult.columns) {
      this.filterSelectObj = this.tableConfigResult.columns;
      this.filterSelectObj.filter((o) => {
        if (o.optionFilter) {
          o.optionFilter = this.getFilterObject(this.tableContentResult, o.dataField);
        } else {
          o.optionFilter = null;
        }
      });
    }
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
  }

  getThCol() {
    this.displayedColumns = [];
    if (this.editOrNot) {
      this.displayedColumns.push('editCol');
    }
    if (this.deleteOrNot) {
      this.displayedColumns.push('deleteCol');
    }
    if (this.postOrNot) {
      this.displayedColumns.push('hieulucCol');
    }
    this.tableConfigResult.columns.forEach((i) => {
      this.displayedColumns.push(i.dataField);
    });
    if (this.uploadImg) {
      this.displayedColumns.push('uploadCol');
    }
    if (this.isCheckboxDuyet) {
      this.displayedColumns.push('duyetCol');
    }
    if (this.isResult) {
      this.displayedColumns.push('resultCol');
    }
    if (this.buttonTicket) {
      this.displayedColumns.push('btnCol');
    }
  }

  functionEdit(obj?, index?) {
    const modalRef = this.modalService.open(this.inputComponent, {size: this.sizeModal, backdrop: 'static'});
    modalRef.componentInstance.obj = obj;
    modalRef.componentInstance.tbList = this.tableContentResult;
    // modalRef.componentInstance.rightAdmin = this.superAdmin;
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
            // @ts-ignore
            if (res.result) {
              this.dataSource.data = this.tableContentResult.filter(
                (item) => item !== obj
              );
              this.toastrService.success('Xoá thành công');
            } else {
              this.toastrService.error('Xoá thất bại');
            }
          });
        }
      });
  }

  export() {
    this.dataService.exportBCFunction(this.queryInput, this.tableName);
    // this.spinnerService.show();
    // const content = {
    //     query: this.queryInput,
    //     user_email: this.authService.getEmailUser(),
    //     name_table: this.tableName
    // };
    // this.dataService.exportReport(content).subscribe((res) => {
    //     const pathFile = res.result;
    //     if (pathFile) {
    //         this.spinnerService.hide();
    //         this.confirmationDialogService
    //             .confirm('Xác nhận', 'Xác nhận lưu file? ')
    //             .then((confirmed) => {
    //                 if (confirmed === true) {
    //                     window.location.href = this.baseUrl + '/reports/' + pathFile;
    //                 }
    //             });
    //     } else {
    //         this.spinnerService.hide();
    //         this.toastrService.error('Lỗi xuất báo cáo!');
    //     }
    // }, error => {
    //     this.toastrService.error('Lỗi xuất báo cáo!');
    //     setTimeout(() => {
    //         this.spinnerService.hide();
    //     }, 5000);
    // });
  }

  exportNV() {
    this.dataService.exportNVFunction(this.typeReport, this.queryInput);
    // this.spinnerService.show();
    // const content = {
    //     type: this.typeReport,
    //     input: this.queryInput
    // };
    // this.dataService.exportReportNV(content).subscribe((res) => {
    //     const pathFile = res.result;
    //     if (pathFile) {
    //         this.spinnerService.hide();
    //         this.confirmationDialogService
    //             .confirm('Xác nhận', 'Xác nhận lưu file? ')
    //             .then((confirmed) => {
    //                 if (confirmed === true) {
    //                     window.location.href = this.baseUrl + '/reports/' + pathFile;
    //                 }
    //             });
    //     } else {
    //         this.spinnerService.hide();
    //         this.toastrService.error('Lỗi xuất báo cáo!');
    //     }
    // }, error => {
    //     this.toastrService.error('Lỗi xuất báo cáo!');
    //     setTimeout(() => {
    //         this.spinnerService.hide();
    //     }, 5000);
    // });
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


  getFilterObject(fullObj, key) {
    const uniqChk = [];
    if (fullObj) {
      // if (key.includes('date')){
      //     fullObj.forEach((obj) => {
      //         const date = new Date(obj[key]);
      //         obj[key] = [date.getDate(), date.getMonth()+1, date.getFullYear()].join('/');
      //     })
      // }
      fullObj.filter((obj) => {
        if (!uniqChk.includes(obj[key])) {
          uniqChk.push(obj[key]);
        }
        return obj;
      });
      return uniqChk;
    }
  }

  filterChange(filter, event) {
    const arr = [];
    event.value.forEach((i) => {
      arr.push(i.trim());
      this.filterValues[filter.dataField] = arr;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.getOptionFilter(this.contentFiltered);
  }

  getOptionFilter(content) {
    this.filterSelectObj.filter((o) => {
      if (o.optionFilter) {
        o.optionFilter = this.getFilterObject(content, o.dataField);
      } else {
        o.optionFilter = null;
      }
    });

  }

  createFilter() {
    // tslint:disable-next-line:only-arrow-functions
    const filterFunction = function(data, filter): boolean {
      const searchData = JSON.parse(filter);
      let status = true;
      for (const key in searchData) {
        if (searchData[key].length > 0) {
          console.log(data[key].toString());
          const a = searchData[key].some(item => item == data[key]);
          if (a) {
            status = true;
          } else {
            status = false;
            break;
          }
        }
      }
      return status;
    };
    return filterFunction;
  }

  resetFilters() {
    this.dataSource.data = this.tableContentResult;
    this.filterValues = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
  }

  checkboxEvent(el, e) {
    this.checkAll = null;
    el.recorded = e.target.value;
    this.arrUpdate = this.arrUpdate.filter(item => item.ptq_id !== el.ptq_id);
    this.arrUpdate.push({ptq_id: el.ptq_id, emp_code: el.emp_code, recorded: el.recorded});
  }

  checkboxAllEvent() {
    this.arrUpdate = [];
    const a = this.dataSource.filteredData;
    a.forEach((item) => {
      // @ts-ignore
      item.recorded = this.checkAll;
      // @ts-ignore
      this.arrUpdate.push({ptq_id: item.ptq_id, emp_code: item.emp_code, recorded: this.checkAll});
    });
  }

  save() {
    const objAdd = {
      array: this.arrUpdate,
      user_email: this.authService.getEmailUser(),
      name_table: this.tableName
    };
    this.dataService.updateData(objAdd).subscribe((res) => {
      if (res.result && res.result.status === 1) {
        this.toastrService.success(res.result.msg);
      } else if (res.result && res.result.status === 0) {
        this.toastrService.error(res.result.msg);
      } else {
        this.toastrService.error('Cập nhập lỗi!');
      }
    });
    this.arrUpdate = [];
  }

  isStringDate(val): boolean {
    return typeof (val) !== 'string' || (typeof (val) === 'string' && val.indexOf(',') < 0);
  }

  openedChange(opened: boolean) {
    this.getOptionFilter(this.dataSource.filteredData);
    this.contentFiltered = this.dataSource.filteredData;
  }

  openDetail(obj) {
    console.log(obj);
    this.openDetailEvent.emit({isOpen: 'opened', value: obj});
  }

  print(el) {
    this.spinnerService.show();
    this.router.navigateByUrl(el.routeTicket + '/' + el.task_time).then(() => {
      setTimeout(() => this.spinnerService.hide(), 3000);
      setTimeout(() => window.print(), 3200);
    });
  }

  trackByFn(index, item) {
    return index;
  }
}
