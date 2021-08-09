import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EmpService} from '../../../_services/data/emp.service';
import {AdminService} from '../../../_services/data/admin.service';
import {EmpCheckinService} from '../../../_services/data/empCheckin.service';
import {AtldService} from '../../../_services/data/atld.service';
import {UserService} from 'src/app/_services/data/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-depart',
  templateUrl: './select-depart.component.html',
  styleUrls: ['./select-depart.component.css']
})
export class SelectDepartComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() isShowEmail = true;
  @Input() isShowEmpCode = true;
  @Input() isShowEmpName = false;
  @Input() isShowNameOrCode: boolean;
  @Input() isMultiple = true;
  @Input() selectDefault = false;
  searchItem = new Item();
  emailList: any;
  empCodeList: any;
  empNameList: any;
  childDepartList: any;
  maVungArray: any;
  nameOrCode = 'email';
  rightSection: any;
  branchRight: any;
  childDepartRight: any;
  @Input() hasRight: boolean;
  elementBEvent: EventEmitter<object> = new EventEmitter();
  elementPEvent: EventEmitter<object> = new EventEmitter();
  elementCEvent: EventEmitter<object> = new EventEmitter();
  elementEmailEvent: EventEmitter<object> = new EventEmitter();
  elementCodeEvent: EventEmitter<object> = new EventEmitter();
  elementNameEvent: EventEmitter<object> = new EventEmitter();

  constructor(private empService: EmpService, private adminService: AdminService,
              private empCheckinService: EmpCheckinService, private atldService: AtldService,
              private userService: UserService) {
  }

  async ngOnInit() {
    // this.isUserRight();
  }

  eventBranch(e) {
    this.elementPEvent.emit(null);
    this.elementCEvent.emit(null);
    this.elementEmailEvent.emit(null);
    this.elementCodeEvent.emit(null);
    this.elementNameEvent.emit(null);
    this.maVungArray = null;
    this.childDepartList = null;
    this.emailList = null;
    this.empCodeList = null;
    this.empNameList = null;
    this.searchItem.branch = e;
    if (e) {
      if (Array.isArray(e) && e.length > 0) {
        if (_.isEqual(e, ['TIN', 'PNC'])) {
          this.maVungArray = this.branchRight.PNC.concat(this.branchRight.TIN);
        }
        if (_.isEqual(e, ['TIN'])) {
          this.maVungArray = this.branchRight.TIN;
        }
        if (_.isEqual(e, ['PNC'])) {
          this.maVungArray = this.branchRight.PNC;
        }
      } else if (typeof (e) === 'string' && e !== '') {
        if (e === 'TIN') {
          this.maVungArray = this.branchRight.TIN;
        }
        if (e === 'PNC') {
          this.maVungArray = this.branchRight.PNC;
        }
      }
    }
    this.messageEvent.emit(this.searchItem);
  }

  eventMaVung(e) {
    this.elementCEvent.emit(null);
    this.elementEmailEvent.emit(null);
    this.elementCodeEvent.emit(null);
    this.elementNameEvent.emit(null);
    this.childDepartList = null;
    this.emailList = null;
    this.empCodeList = null;
    this.empNameList = null;
    this.searchItem.parent_depart = e;
    console.log(e);
    if (e) {
      this.childDepartList = [];
      if (Array.isArray(e) && e.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < e.length; i++) {
          this.childDepartList = this.childDepartList.concat(this.childDepartRight[e[i]]);
        }
      } else if (typeof (e) === 'string' && e !== '') {
        this.childDepartList = this.childDepartRight[e];
        console.log(this.childDepartRight[e]);
      } else {
        this.searchItem.parent_depart = null;
      }
    } else {
      this.childDepartList = null;
    }
    this.messageEvent.emit(this.searchItem);
  }

  eventChildDepart(e) {
    console.log(e);
    this.elementEmailEvent.emit(null);
    this.elementCodeEvent.emit(null);
    this.elementNameEvent.emit(null);
    this.emailList = null;
    this.empCodeList = null;
    this.empNameList = null;
    const arrayEmail = [];
    const arrayCode = [];
    const arrayName = [];
    this.searchItem.child_depart = e;
    if (e) {
      this.atldService.getEmailListFollowChildDepart(this.searchItem.child_depart).subscribe((res) => {
        res.forEach((i) => {
          arrayEmail.push(i.email);
          arrayCode.push(i.emp_code);
          arrayName.push(i.emp_name);
        });
        this.emailList = arrayEmail;
        this.empCodeList = arrayCode;
        this.empNameList = arrayName;
      });
    } else {
      this.searchItem.child_depart = null;
    }
    this.messageEvent.emit(this.searchItem);
  }

  eventEmail(e) {
    this.searchItem.email = e;
    this.messageEvent.emit(this.searchItem);
  }

  eventEmpCode(e) {
    this.searchItem.emp_code = e;
    this.messageEvent.emit(this.searchItem);
  }

  eventEmpName(e) {
    this.searchItem.emp_name = e;
    this.messageEvent.emit(this.searchItem);

  }

  // async isUserRight() {
  //   this.userService.getUserRightAll().subscribe(async (res) => {
  //     this.branchRight = res.branchRight;
  //     this.rightSection = res.rightSection;
  //     this.childDepartRight = res.childDepartRight;
  //   });
  // }

  dtEvent(e) {
    console.log(e);
    switch (e.str) {
      case 'branch':
        this.eventBranch(e.value);
        break;
      case 'parent_depart':
        this.eventMaVung(e.value);
        break;
      case 'child_depart':
        this.eventChildDepart(e.value);
        break;
      case 'email':
        this.eventEmail(e.value);
        break;
      case 'code':
        this.eventEmpCode(e.value);
        break;
      case 'name':
        this.eventEmpName(e.value);
        break;
    }
    this.searchItem[e.str] = e.value;
    this.messageEvent.emit(this.searchItem);
  }

}

class Item {
  branch: any;
  // tslint:disable-next-line:variable-name
  child_depart: any;
  email: any;
  // tslint:disable-next-line:variable-name
  emp_code: any;
  // tslint:disable-next-line:variable-name
  emp_name: any;
  // tslint:disable-next-line:variable-name
  parent_depart: any;
}
