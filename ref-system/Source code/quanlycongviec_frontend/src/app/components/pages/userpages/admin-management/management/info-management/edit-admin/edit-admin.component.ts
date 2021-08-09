import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {EmpService} from '../../../../../../../_services/data/emp.service';
import {AdminService} from '../../../../../../../_services/data/admin.service';
import {AuthService} from '../../../../../../../_services/auth/auth.service';
import {UserService} from '../../../../../../../_services/data/user.service';
import {RightAdmin, RightSuperAdmin} from '../../../../../../../_models/constants/rightAdmin';
import {DataService} from '../../../../../../../_services/data/data.service';
import {TableName} from '../../../../../../../_models/constants/tableName';
import {ConfirmationDialogService} from '../../../../../../shared/confirmation-dialog/confirmation-dialog.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal,
              private empService: EmpService,
              private adminService: AdminService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private userService: UserService,
              private dataService: DataService,
              private confirmationDialogService: ConfirmationDialogService,
              private spinnerService: NgxSpinnerService) {
  }

  itemAdd = {
    email: '',
    per_id: '',
    super_admin: '',
    child_depart_right: ''
  };
  rightAllList = RightAdmin;
  perIdFollowRightAdmin = RightAdmin;
  obj: any;
  title: string;
  childDepartList: any;
  parentDepartList: any;
  childDepartP: any;
  arrayChild = [];
  isSuperAdmin: boolean;
  isRegion = false;
  isDepart = false;
  idOfPerFromTable: any;
  isDisableAdd: boolean;
  arrayPerId = [];
  rightAdmin: any;

  async ngOnInit() {
    // this.isUserRight();
    if (this.obj) {
      this.title = 'Cập nhập thông tin';
      this.arrayPerId = this.obj.per_id.split(',');
      Object.keys(this.itemAdd).forEach((key) => {
        this.itemAdd[key] = this.obj[key];
      });
      if (this.obj.child_depart_right) {
        this.arrayChild = this.obj.child_depart_right.split(',');
      }
    } else {
      this.title = 'Thêm thông tin';
    }
    this.getRightAllList();
    // this.parentDepartList = await this.empService.parentDepartList();
  }

  receiveTypeRight(e) {
    console.log(e);
    const index = RightAdmin.indexOf(e);
    if (index > -1){
      const str = index.toString();
      if (this.obj && this.obj.per_id !== '') {
        if (!this.itemAdd.per_id.includes(str)) {
          this.findPerId(str);
        }
        let array = this.itemAdd.per_id.split(',');
        array = array.filter(
            (item, i, arr) => arr.findIndex(t => t === item) === i
        );
        this.arrayPerId = array;
        this.itemAdd.per_id = [array].join(',');
        console.log(this.arrayPerId);
      } else {
        this.itemAdd.per_id = str;
        this.arrayPerId.push(str);
      }
    }
  }

  findPerId(str) {
    if (str === '1' && this.itemAdd.per_id.includes('2')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('2', str);
    } else if (str === '2' && this.itemAdd.per_id.includes('1')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('1', str);
    } else if (str === '3' && this.itemAdd.per_id.includes('4')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('4', str);
    } else if (str === '4' && this.itemAdd.per_id.includes('3')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('3', str);
    } else if (str === '5' && this.itemAdd.per_id.includes('6')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('6', str);
    } else if (str === '6' && this.itemAdd.per_id.includes('5')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('5', str);
    } else if (str === '7' && this.itemAdd.per_id.includes('8')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('8', str);
    } else if (str === '8' && this.itemAdd.per_id.includes('7')) {
      this.itemAdd.per_id = this.itemAdd.per_id.replace('7', str);
    } else {
      this.itemAdd.per_id = this.itemAdd.per_id + ',' + str;
    }
  }

  addNew() {
    this.spinnerService.show();
    if (!this.isDisableAdd) {
      const objAdd = {
        array: [this.itemAdd],
        user_email: this.authService.getEmailUser(),
        name_table: TableName.adminTb
      };
      this.dataService.addData(objAdd).subscribe((res) => {
        console.log(res);
        // @ts-ignore
        if (res.result) {
          if (this.obj){
            this.obj.per_id = this.itemAdd.per_id;
            this.obj.child_depart_right = this.itemAdd.child_depart_right;
          }
          this.toastrService.success('Cập nhật thành công!');
        } else {
          this.toastrService.error('Cập nhật thất bại!');
        }
        this.spinnerService.hide();
      });
    } else {
      this.toastrService.error('Email đã phân quyền, nếu muốn bổ sung quyền thì vào QL admin -> thông tin -> Edit quyền');
      this.spinnerService.hide();
    }
  }

  deleteItem(array, o) {
    if (array === 'perId') {
      this.arrayPerId = this.arrayPerId.filter(
        (item) => item !== o
      );
    }
    if (array === 'depart') {
      this.arrayChild = this.arrayChild.filter(
        (item) => item !== o
      );
    }
    this.itemAdd.per_id = this.arrayPerId.join(',');
    this.itemAdd.child_depart_right = this.arrayChild.join(',');
  }
  async receiveEmp(e) {
    if (e.email) {
      const dt = await this.empService.emailListFromRightTb();
      if (dt.includes(e.email[0].toLowerCase())) {
        this.isDisableAdd = true;
      } else {
        this.isDisableAdd = false;
      }
      this.itemAdd.email = e.email[0].toLowerCase();
    }
  }

  deleteRightObject(obj) {
    const content = {
      user_email: this.authService.getEmailUser(),
      id_table: obj.email,
      name_table: TableName.adminTb
    };
    this.confirmationDialogService
      .confirm('Xác nhận', 'Bạn có chắc chắn xoá dữ liệu này không? ')
      .then((confirmed) => {
        if (confirmed === true) {
          this.dataService.deleteData(content).subscribe((res) => {
            // @ts-ignore
            if (res.result) {
              this.toastrService.success('Xoá thành công');
            } else {
              this.toastrService.error('Xoá thất bại');
            }
          });
        }
        this.activeModal.close();
      });
  }

  async receiveParentDepart(e) {
    this.childDepartP = await this.empService.childDepartListFollowParent(e);
  }

  receiveChildDepart(e) {
    if (this.obj) {
      this.arrayChild.push(e);
    } else {
      this.arrayChild = e;
    }
    this.itemAdd.child_depart_right = this.arrayChild.join(',');
  }

  getRightAllList() {
    const a = [];
    if (this.rightAdmin) {
      if (!this.rightAdmin.includes('ALL')) {
        RightSuperAdmin.forEach((i) => {
          if (this.rightAdmin.includes(i.value)) {
            a.push(i.permission[0], i.permission[1]);
          }
        });
        this.rightAllList = a;
      } else {
        this.rightAllList = RightAdmin;
      }
    }
  }

  // isUserRight() {
  //   this.userService.getUserRightAll().subscribe(async (res) => {
  //     this.rightAdmin = res.superAdmin;
  //     const adminType = Object.keys(res.rightSection)[0];
  //     this.parentDepartList = await this.empService.parentDepartList(adminType);
  //   });
  // }
}
