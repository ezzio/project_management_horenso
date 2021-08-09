import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../../../../_services/data/admin.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {EditAdminComponent} from './edit-admin/edit-admin.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RightAdmin, RightSuperAdmin} from '../../../../../../_models/constants/rightAdmin';
import {EmpService} from '../../../../../../_services/data/emp.service';
import {UserService} from '../../../../../../_services/data/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-info-management',
  templateUrl: './info-management.component.html',
  styleUrls: ['./info-management.component.css']
})
export class InfoManagementComponent implements OnInit {
  public tableContent: any;
  public tableConfig: any;
  showResult: boolean;
  selectItem = {
    child_depart: [],
    email: [],
    per_id: []
  };
  childDepartList: any;
  rightAdminList = RightAdmin;
  superAdmin: any;

  constructor(private adminService: AdminService, private spinnerService: NgxSpinnerService,
              private modalService: NgbModal, private empService: EmpService,
              private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    // this.isUserRight();
  }

  openInfo() {
    this.refreshTable();
    this.showResult = true;
  }

  receiveMessage(e){
    this.selectItem = e;
  }
  refreshTable() {
    this.spinnerService.show();
    if (this.superAdmin && !this.superAdmin.includes('ALL')){
      const a = this.superAdmin.split(',');
      const arr = [];
      const arr1 = [];
      RightSuperAdmin.forEach((item) => {
        if (a.includes(item.value)){
          arr.push(item.permission[0], item.permission[1]);
        }
      });
      arr.forEach((i) => {
        arr1.push(RightAdmin.indexOf(i).toString());
      });
      this.selectItem.per_id = arr1;
    }
    const objSearch = {
      child_depart: this.selectItem.child_depart,
      email: this.selectItem.email,
      per_id: this.selectItem.per_id
    };
    if (objSearch.child_depart && objSearch.child_depart.length > 0){
      const ob = this.adminService.getAllAdminRightOrATLD('admin', objSearch);
      ob.obs.subscribe((res) => {
        this.tableContent = res;
        this.spinnerService.hide();
      });
    } else {
      this.toastrService.error('Vui lòng chọn trường bộ phận để tiếp tục');
      setTimeout(() => {
        this.spinnerService.hide();
      }, 5000);
    }
  }

  eventTypeRight(e) {
    let a;
    if (e[0] === 'all'){
      a = this.rightAdminList;
    } else {
      a = e;
    }
    const arr = [];
    a.forEach((i) => {
      arr.push(this.rightAdminList.indexOf(i).toString());
    });
    this.selectItem.per_id = arr;
  }

  addNew() {
    const modalRef = this.modalService.open(EditAdminComponent, {size: 'lg'});
    modalRef.componentInstance.childDepartList = this.childDepartList;
    modalRef.componentInstance.isSuperAdmin = false;
    modalRef.componentInstance.rightAdmin = this.superAdmin;
  }
  // isUserRight(){
  //   this.userService.getUserRightAll().subscribe((res) => {
  //     this.superAdmin = res.superAdmin;
  //   });
  // }

}
