import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmpService} from 'src/app/_services/data/emp.service';
import {TbvpService} from 'src/app/_services/data/tbvp.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {GeneralService} from '../../../../_services/data/general.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FormTemplateComponent implements OnInit {
  userGroup = {};
  form: FormGroup;
  @Input() radioNumber = false;
  @Input() submitted = false;
  @Input() disableAllForm = true;
  // @Input() isLabel: true;
  @Input() formInput: string;
  @Input() isAvatar: boolean;
  @Input() formLabel = 'form__label';
  @Input() validFormLabel = 'validFormLabel';
  @Input() customSelect = 'custom';
  @Input() defaultCol: any;
  @Input() customField = 'form__field';
  @Input() customDate = 'date';
  @Input() customFormDateTime: any;
  @Input() styleBtnCalendar: string;
  @Input() public formConfig: any;
  @Input() isEmpInput: boolean;
  @Input() isRegion: boolean;
  @Input() elementForm: any;
  @Input() disableUpload = false;
  @Input() styleInputGroup = 'inputGroup100';
  @Input() minDate = {year: 1900, month: 1, day: 1};
  @Input() maxDate = {year: 2030, month: 1, day: 1};
  @Input() elementFormChosen: EventEmitter<object>;
  @Input() formConfigChosen: EventEmitter<object>;
  @Output() regionEvent = new EventEmitter<object>();
  @Output() empEvent = new EventEmitter<object>();
  @Output() dateEvent = new EventEmitter<object>();
  @Output() dateSEvent = new EventEmitter<object>();
  @Output() timeSEvent = new EventEmitter<object>();
  @Output() datetimeSEvent = new EventEmitter<object>();
  @Output() timeEvent = new EventEmitter<object>();
  @Output() dateTimeEvent = new EventEmitter<object>();
  @Output() formEvent = new EventEmitter<object>();
  @Output() fileEvent = new EventEmitter<object>();
  @Output() imageEvent = new EventEmitter<object>();
  @Output() formValidEvent = new EventEmitter<object>();
  optionElement: any;
  elementFormResult: any;
  public dateValue: Date;
  file: File;
  fileImg: File;
  formConfigResult: any;
  loading = false;
  @Input() setDate: NgbDateStruct;
  public interval = 15;
  public customFormat = 'HH:mm:ss';

  constructor(private empService: EmpService, private tbvpService: TbvpService,
              private fb: FormBuilder, private calendar: NgbCalendar,
              private generalService: GeneralService) {
  }

  ngOnInit(): void {
    if (this.elementFormChosen) {
      this.elementFormChosen.subscribe(event => {
        this.elementFormResult = event;
      });
    } else if (this.elementForm) {
      this.elementFormResult = this.elementForm;
    }
    if (this.formConfigChosen) {
      this.formConfigChosen.subscribe(event => {
        this.formConfigResult = event;
        this.checkFormConfig();
      });
    } else if (this.formConfig) {
      this.formConfigResult = this.formConfig;
      this.checkFormConfig();
    }
  }

  addTagPromise(name) {
    return new Promise((resolve) => {
      this.loading = true;
      // Simulate backend call. s
      setTimeout(() => {
        resolve({id: 5, name, valid: true});
        this.loading = false;
      }, 1000);
    });
  }

  receiveRegion(e) {
    this.regionEvent.emit(e);
  }

  async changeEvent(str, e) {
    if (str === 'ng_di_ct' && e !== '') {
      await this.setOptions(['child_depart'], e, 'emp', 'bp_ng_di_ct');
    }
    if (str === 'email_tam_ung' && e !== '') {
      await this.setOptions(['noi_dung_de_xuat', 'so_tien'], e, 'tamung', 'cac_khoan_tam_ung');
    }
    if (str === 'cmnd_hoac_can_cuoc' && e === 'Căn cước') {
      this.form.controls.so_cmnd_cu.enable();
    }
    if (str === 'cmnd_hoac_can_cuoc' && e !== 'Căn cước') {
      this.form.controls.so_cmnd_cu.disable();
    }
    if (str === 'tham_gia_bao_hiem' && e === 'Đã từng tham gia') {
      this.form.controls.so_ho_khau.disable();
      this.form.controls.chu_ho.disable();
      this.form.controls.ngay_sinh_chu_ho.disable();
      this.form.controls.cmnd_chu_ho.disable();
      this.form.controls.so_so_bhxh.enable();
      this.form.controls.so_to_roi.enable();
    }
    if (str === 'tham_gia_bao_hiem' && e === 'Chưa từng tham gia') {
      this.form.controls.so_so_bhxh.disable();
      this.form.controls.so_to_roi.disable();
      this.form.controls.so_ho_khau.enable();
      this.form.controls.chu_ho.enable();
      this.form.controls.ngay_sinh_chu_ho.enable();
      this.form.controls.cmnd_chu_ho.enable();
    }
    if (str === 'biet_thong_tin_qua' && e !== 'Giới thiệu nội bộ') {
      if ( this.form.controls.ho_ten_nguoi_gioi_thieu && this.form.controls.email_nguoi_gioi_thieu){
        this.form.controls.ho_ten_nguoi_gioi_thieu.disable();
        this.form.controls.email_nguoi_gioi_thieu.disable();
      }
    }
    if (str === 'biet_thong_tin_qua' && e === 'Giới thiệu nội bộ') {
      if ( this.form.controls.ho_ten_nguoi_gioi_thieu && this.form.controls.email_nguoi_gioi_thieu) {
        this.form.controls.ho_ten_nguoi_gioi_thieu.enable();
        this.form.controls.email_nguoi_gioi_thieu.enable();
      }
    }
    if (str === 'ngan_hang' && e !== '') {
      await this.setOptions(['chi_nhanh'], e, 'bank', 'chi_nhanh_ngan_hang');
    }
    if (str === 'ho_ten_nguoi_gioi_thieu' && e !== '') {
      await this.setOptions(['email'], e, 'emp', 'email_nguoi_gioi_thieu');
    }
    if (str === 'da_tung_lam_viec_fpt' && e === 'Có') {
      this.form.controls.ten_cty_da_lam.enable();
    }
    if (str === 'da_tung_lam_viec_fpt' && e !== 'Có') {
      this.form.controls.ten_cty_da_lam.disable();
    }
    this.formEvent.emit({[str]: e});

  }

  blurEvent(str, e) {
    const name = e.target.value;
    if (str === 'ho_ten' && name !== '') {
      this.elementFormResult[str] = this.generalService.convertName(name);
    }
  }

  async setOptions(strArray: any, value: any, typeTb: string, valueOfEffect: string) {
    // @ts-ignore
    const dt = await this.empService.getOneInfoFromStr(value, typeTb);
    const arr = [];
    const arr1 = [];
    if (dt && strArray.length === 1) {
      dt.forEach((i) => {
        arr.push(i[strArray[0]]);
      });
    } else {
      dt.forEach((i) => {
        arr.push(i[strArray[0]] + ' - ' + i[strArray[1]] + 'VND');
      });
    }
    arr.forEach((c, j) => {
      arr1.push({id: j, name: c});
    });
    this.formConfigResult.forEach((i) => {
      if (i.dataField === valueOfEffect) {
        Object.assign(i, {options: arr1});
      }
    });
  }

  convertToString(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  receiveTimeDate(str, e) {
    if (e && e !== '') {
      this.dateTimeEvent.emit({[str]: e});
    }
  }

  receiveDate(str, e) {
    if (e && e !== '') {
      this.dateEvent.emit({[str]: e});
    }
  }

  receiveSDate(str, e) {
    console.log(e);
    let a;
    if (e) {
      if (typeof (e) !== 'string') {
        a = [this.convertToString(e.day), this.convertToString(e.month), this.convertToString(e.year)].join('/');
      } else {
        const d = new Date(e);
        a = [this.convertToString(d.getDate()), this.convertToString(d.getMonth() + 1), this.convertToString(d.getFullYear())].join('/');

      }
      this.dateSEvent.emit({[str]: a});
    }
  }
  receiveSTime(str, e){
    this.timeSEvent.emit({[str]: e + ':00'});
  }

  receiveSDateTime(str, e) {
    if (e && e !== '') {
      const d = new Date(e);
      const a = [this.convertToString(d.getDate()), this.convertToString(d.getMonth() + 1),
        this.convertToString(d.getFullYear())].join('/');
      const b = [this.convertToString(d.getHours()), this.convertToString(d.getMinutes())].join(':');
      this.datetimeSEvent.emit({[str]: a + ' ' + b + ':00'});
    }
  }

  receiveTime(str, e) {
    if (e && e !== '') {
      const a = e.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      const b = a.split(', ');
      if (b[0].indexOf(':') > -1) {
        this.timeEvent.emit({[str]: b[0]});
      } else {
        this.timeEvent.emit({[str]: b[1]});
      }
    }
  }

  receiveEmp(e) {
    this.empEvent.emit(e);
  }

  async upload(event) {
    this.file = event.target.files[0];
    this.fileEvent.emit(this.file);
  }

  uploadImage(event) {
    this.fileImg = event.target.files[0];
    this.imageEvent.emit(this.fileImg);
  }

  checkFormConfig() {
    const arr = [];
    this.formConfigResult.forEach((i) => {
      if (i.type !== '') {
        arr.push(i);
      }
    });
    this.formConfigResult = arr;
    for (const config of this.formConfigResult) {
      this.userGroup[config.dataField] = new FormControl(this.elementFormResult[config.dataField] || '');
      if (config.type === 'date' || config.type === 'datetime') {
        if (this.elementFormResult[config.dataField]) {
          this.elementFormResult[config.dataField] = new Date(this.elementFormResult[config.dataField]);
        } else {
          if (config.default) {
            this.elementFormResult[config.dataField] = '';
          } else {
            this.elementFormResult[config.dataField] = new Date();
          }
        }
      }
      if (config.type === 'radio'){
        if ((this.elementFormResult[config.dataField] === '' || !this.elementFormResult[config.dataField]) && config.default){
          this.elementFormResult[config.dataField] = config.default;
        }
      } else if (config.type === 'sdatev2') {
        if (this.elementFormResult[config.dataField]) {
          const d = this.elementFormResult[config.dataField].split('/');
          const a = new Date('\'' + d[2] + ',' + d[1] + ',' + d[0] + '\'');
          this.elementFormResult[config.dataField] = {
            year: a.getFullYear(),
            month: a.getMonth() + 1,
            day: a.getDate()
          };
        } else {
          if (config.default) {
            this.elementFormResult[config.dataField] = '';
          } else {
            this.elementFormResult[config.dataField] = this.calendar.getToday();
          }
        }
      } else if (config.type === 'sdatetime') {
        if (this.elementFormResult[config.dataField]) {
          this.elementFormResult[config.dataField] = new Date(this.elementFormResult[config.dataField]).toString();
        } else {
          if (config.default) {
            this.elementFormResult[config.dataField] = '';
          } else {
            this.elementFormResult[config.dataField] = new Date().toString();
          }
        }
      } else if (config.type === 'select') {
        if (!this.elementFormResult[config.dataField] || this.elementFormResult[config.dataField] === '') {
          if (config.default) {
            this.elementFormResult[config.dataField] = config.default;
          }
        }
      }
    }
    this.form = new FormGroup(this.userGroup);
    this.form.statusChanges.subscribe((res) => {
      this.formValidEvent.emit({table: this.form.controls, valid: res});
    });
  }

  checkForError(obj) {
    const input = this.form.controls[obj.dataField];
    if ((input.touched || this.submitted) && input.errors?.required) {
      return true;
    }
    if ((input.touched || this.submitted) && input.errors?.maxlength) {
      return true;
    }
    if ((input.touched || this.submitted) && input.errors?.minlength) {
      return true;
    }
    return false;
  }

  transformAmount(v, e) {
    if (Number(this.elementFormResult[v])) {
      this.elementFormResult[v] = 1;
      e.target.value = this.elementFormResult[v];
    }
  }

  eventClick(v, e) {
    let value = e.target.value;
    if (value !== '' && value.includes(',')) {
      // value = value.substr(1, value.length);
      value = value.split(',').join('');
    }
    this.elementFormResult[v] = value;
  }
}
