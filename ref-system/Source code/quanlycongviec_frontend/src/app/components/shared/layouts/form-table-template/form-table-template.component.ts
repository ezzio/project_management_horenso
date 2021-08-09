import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-table-template',
  templateUrl: './form-table-template.component.html',
  styleUrls: ['./form-table-template.component.css']
})
export class FormTableTemplateComponent implements OnInit {
  userGroup = {};
  form: FormGroup;
  @Input() tableConfig: any;
  @Input()elementForm: any;
  @Input() nameForm: any;
  @Input()customInput = 'custom__input';
  @Input()customSelect = 'custom__select';
  @Output() messageEvent = new EventEmitter<any>();

  loading = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.elementForm);
    console.log(this.tableConfig);
    for (const config of this.tableConfig.columns) {
      this.userGroup[config.dataField] = new FormControl(this.elementForm[config.dataField] || '');
      if (config.type === 'date' || config.type === 'datetime') {
        if (this.elementForm[config.dataField]) {
          this.elementForm[config.dataField] = new Date(this.elementForm[config.dataField]);
        } else {
          if (config.default) {
            this.elementForm[config.dataField] = '';
          } else {
            this.elementForm[config.dataField] = new Date();
          }
        }
      }
    }
    this.form = new FormGroup(this.userGroup);
  }
  addTagPromise(name) {
    return new Promise((resolve) => {
      this.loading = true;
      // Simulate backend call. s
      setTimeout(() => {
        resolve({id: 5, name: name, valid: true});
        this.loading = false;
      }, 1000);
    });
  }
  changeEvent(index, str, e){
    this.elementForm[index][str] = e;
    this.emitContent();
  }
  deleteRow(n){
    this.elementForm = this.elementForm.filter((item) => item !== n);
    this.emitContent();
  }
  emitContent(){
    switch (this.nameForm){
      case 'edu': this.messageEvent.emit({trinh_do_hoc_van: this.elementForm}); break;
      case 'cer': this.messageEvent.emit({chung_chi_chuyen_nganh: this.elementForm}); break;
      case 'exp': this.messageEvent.emit({kinh_nghiem_lam_viec: this.elementForm}); break;
      case 'lang': this.messageEvent.emit({ngoai_ngu: this.elementForm}); break;
    }
  }

}
