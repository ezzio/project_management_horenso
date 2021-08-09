import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../../../_services/data/admin.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmpService} from '../../../../../../_services/data/emp.service';
import {UserService} from '../../../../../../_services/data/user.service';
import {EditSuperadminComponent} from './edit-superadmin/edit-superadmin.component';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
  tableContent = [];
  childDepartList: any;
  isSuperAdmin: boolean;
  constructor(private adminService: AdminService, private spinnerService: NgxSpinnerService,
              private modalService: NgbModal, private empService: EmpService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllList();
  }

  openInfo() {
    const content = {
      super_admin: ['DIEMDANH', 'LUONG', 'CHETAI', 'NHANVIEN', 'TICKET', 'ANTOANLAODONG'],
    };
    this.spinnerService.show();
    const ob = this.adminService.getAllAdminRightOrATLD('admin', content);
    ob.obs.subscribe((res) => {
      this.tableContent = res;
      this.spinnerService.hide();
    });
  }
  async getAllList() {
    this.childDepartList = await this.empService.childDepartList();
  }
  addNew(){
    const modalRef = this.modalService.open(EditSuperadminComponent, {size: 'xl'});
    modalRef.componentInstance.childDepartList = this.childDepartList;
  }
}
