import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css'],
})

export class ImportDataComponent implements OnInit {
  @Input() inputComponent: any;
  @Input() empImportForm: boolean;
  @Input() empImportBtn: boolean;
  @Input() showButtonOpen: boolean;
  @Output() objEvent = new EventEmitter<any>();
  @Output() categoryEvent = new EventEmitter<any>();
  @Input() categorySalary: any;
  @Input() pathData: any;
  @Input() groupFields: any;
  public importList: any;
  category: any;
  fields: any;
  file: File;
  arrayBuffer: any;
  valueFile: any;

  constructor() {
  }

  ngOnInit(): void {
    this.fields = {groupBy: 'branch', text: 'name', value: 'value'};
  }

  addFile(event) {
    this.file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      // tslint:disable-next-line:triple-equals
      for (let i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary', cellDates: true, dateNF: 'dd/mm/yyyy;@'});
      // tslint:disable-next-line:variable-name
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.importList = XLSX.utils.sheet_to_json(worksheet, {raw: false});
      this.convertToStringList(this.importList);
      // this.objEvent.emit(this.importList);
    };
  }

  resetFile(event) {
    event.target.value = '';
  }

  openFile() {
    this.objEvent.emit(this.importList);
  }

  changeCategory() {
    this.categorySalary.forEach((i) => {
      if (i.value === this.category) {
        this.categoryEvent.emit(i);
      }
    });
  }
  convertToStringList(list){
    if (list && list.length > 0)
    list.forEach((i) => {
      Object.keys(i).forEach((key) => {
        i[key] = i[key].toString();
      });
    });
  }
}
