import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GeneralService} from '../../../../../../_services/data/general.service';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  @Input() buttonName = 'Tạo';
  form: FormGroup;
  @Input() title: string;
  @Input() element: any;
  @Input() formLabel = 'form__label__small';
  @Input() validFormLabel = 'validFormLabel__small';
  @Input() customField = 'form__field';
  @Input() customFormDateTime: any;
  @Input() customButton: any;
  setDate1: NgbDateStruct;
  setDate2: NgbDateStruct;
  isShowDes: boolean;
  isCreateOther: boolean;
  @Input() formConfigChosen: EventEmitter<any>;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  public interval = 15;
  public customFormat = 'HH:mm:ss';
  @Output() datetimeEvent: EventEmitter<any> = new EventEmitter<any>();
  date = {
    t_assigned: '',
    deadline: ''
  };
  time = {
    t_assigned: '',
    deadline: ''
  };
  toSecond = {
    t_assigned: 0,
    deadline: 0
  };
  formConfigResult: any;
  @Input() formConfig: any;
  @Input() isShowBtnSave = true;

  isShowBtnSubmit: boolean;
  constructor(public activeModal: NgbActiveModal, private generalService: GeneralService) { }

  ngOnInit(): void {
    if (this.formConfigChosen){
      this.formConfigChosen.subscribe((ev) => {
        this.formConfigResult = ev.columns;
      });
    } else if (this.formConfig){
      this.formConfigResult = this.formConfig.columns;
    }
  }
  formEvent(e){
    const key = Object.keys(e)[0];
    this.element[key] = e[key];
  }
  dateEvent(e){
    console.log(e);
    const key = Object.keys(e)[0];
    if (e){
      this.date[key] = e[key];
      if (key === 't_assigned'){
        this.formConfigResult.forEach((i) => {
          if (i.dataField === 'deadline'){
            Object.assign(i, {minDate: this.generalService.convertStrToNgbDate(e[key])});
          }
        });
      }
    }
  }
  convertNumber(n){
    return this.generalService.convertNumber(n);
  }
  timeEvent(e){
    if (e){
      const key = Object.keys(e)[0];
      this.time[key] = e[key];
    }
  }
  formValidEvent(e){
    if (e.valid === 'VALID'){
      this.isShowBtnSubmit = true;
    } else {
      this.isShowBtnSubmit = false;
    }
  }
  changeEvent(e, str){}
  submit(){
    const dict = {};
    if (this.date.t_assigned !== '' && this.time.t_assigned !== ''){
      this.element.t_assigned = this.date.t_assigned + ' ' + this.time.t_assigned;
    }
    if (this.date.deadline !== '' && this.time.deadline !== ''){
      this.element.deadline = this.date.deadline + ' ' + this.time.deadline;
    }
    if (this.generalService.convertDateStrToSecond(this.element.t_assigned) >
        this.generalService.convertDateStrToSecond(this.element.deadline)){
      Swal.fire('Lỗi', 'Lỗi nhập ngày deadline nhỏ hơn ngày bắt đầu, vui lòng kiểm tra lại', 'error');
    } else {
      Object.keys(this.element).forEach((key) => {
        if (this.element[key] !== null && this.element[key] !== ''){
          Object.assign(dict, {[key]: this.element[key]});
        }
      });
      console.log(dict);
      this.dataEvent.emit(dict);
      // console.log(this.dataEvent.emit(dict));
    }
  }
  close(){
    this.closeEvent.emit({status: '123'});
    this.activeModal.close();

  }
}
