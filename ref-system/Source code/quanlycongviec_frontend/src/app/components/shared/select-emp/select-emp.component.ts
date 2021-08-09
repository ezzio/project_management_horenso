import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmpService} from '../../../_services/data/emp.service';

@Component({
  selector: 'app-select-emp',
  templateUrl: './select-emp.component.html',
  styleUrls: ['./select-emp.component.css']
})
export class SelectEmpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() showEmpName: boolean;
  @Input() showEmpMBN = true;
  @Input() showEmail = false;
  followItem: any;
  public allName = [];
  public allCode = [];
  public allMBN = [];
  public allEmail = [];
  searchItem = {
    emp_name: '',
    emp_code: '',
    MBN_account_name: '',
    email: ''
  };
  selectItem: any;

  constructor(private empService: EmpService) {
  }

  ngOnInit(): void {
    this.getEmp();
  }

  getEmp() {
    this.empService.getAllEmp().subscribe((data) => {
      data.forEach((i) => {
        this.allName.push(i.emp_name);
        this.allCode.push(i.emp_code);
        this.allEmail.push(i.email);
      });
    });
    this.empService.getMBNFromDeviceTb().subscribe((data) => {
      data.forEach((i) => {
        this.allMBN.push(i.MBN_account_name);
      });
    });
  }

  sendMessage() {
    switch (this.followItem) {
      case 'emp_name': this.selectItem = {emp_name: this.searchItem.emp_name}; break;
      case 'emp_code': this.selectItem = {emp_code: this.searchItem.emp_code}; break;
      case 'MBN_account_name': this.selectItem = {MBN_account_name: this.searchItem.MBN_account_name}; break;
      case 'email': this.selectItem = {email: this.searchItem.email}; break;
    }
    console.log(this.selectItem);
    this.messageEvent.emit(this.selectItem);
  }
}
