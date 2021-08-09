import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {EmpService} from '../../../../../../../_services/data/emp.service';
import {AdminService} from '../../../../../../../_services/data/admin.service';
import {AuthService} from '../../../../../../../_services/auth/auth.service';
import {UserService} from '../../../../../../../_services/data/user.service';
import {RightAdmin, RightSuperAdmin} from '../../../../../../../_models/constants/rightAdmin';
import {TableName} from '../../../../../../../_models/constants/tableName';
import {ConfirmationDialogService} from '../../../../../../shared/confirmation-dialog/confirmation-dialog.service';
import {DataService} from '../../../../../../../_services/data/data.service';

@Component({
    selector: 'app-edit-admin',
    templateUrl: './edit-superadmin.component.html',
    styleUrls: ['./edit-superadmin.component.css']
})
export class EditSuperadminComponent implements OnInit {
    constructor(public activeModal: NgbActiveModal,
                private empService: EmpService,
                private adminService: AdminService,
                private authService: AuthService,
                private toastrService: ToastrService,
                private userService: UserService,
                private confirmationDialogService: ConfirmationDialogService,
                private dataService: DataService) {
    }

    itemAdd = new Item();
    itemOld = new Item();
    itemNew = new Item();
    rightSuperAllList = RightSuperAdmin;
    obj: any;
    title: string;
    childDepartList: any;
    arraySuperAdmin = [];
    idOfPerFromTable: any;
    rightAdmin: any;
    isDisableAdd: boolean;

    async ngOnInit() {
        // this.isUserRight();
        console.log(this.obj);
        if (this.obj) {
            this.title = 'Cập nhập thông tin';
            this.itemAdd = this.obj;
            // this.itemNew = this.itemAdd;
            if (this.obj.super_admin !== null || this.obj.super_admin !== '') {
                this.arraySuperAdmin = this.obj.super_admin.split(',');
            }
        } else {
            this.title = 'Thêm thông tin';
        }
    }

    receiveTypeRight(e) {
        this.arraySuperAdmin.push(e);
        this.itemOld = this.itemAdd;
        // this.itemNew.super_admin = [this.arraySuperAdmin].join(',');
        this.itemAdd.super_admin = [this.arraySuperAdmin].join(',');
        RightSuperAdmin.forEach((i) => {
            if (i.value === e) {
                const a = RightAdmin.indexOf(i.permission[1]).toString();
                if (this.obj) {
                    if (this.obj.per_id.includes(a)) {
                        this.itemAdd.per_id = this.obj.per_id;
                        // this.itemNew.per_id = this.obj.per_id;
                    } else {
                        if (this.obj.per_id !== null || this.obj.per_id !== '') {
                            this.itemAdd.per_id = this.obj.per_id + ',' + a;
                            // this.itemNew.per_id = this.obj.per_id + ',' + a;
                        } else {
                            this.itemAdd.per_id = a;
                            // this.itemNew.per_id = a;
                        }
                    }
                } else {
                    this.itemAdd.per_id = a;
                    // this.itemNew.per_id = a;
                }
            }
        });
    }

    addNew() {
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
                    this.toastrService.success('Cập nhật thành công!');
                } else {
                    this.toastrService.error('Cập nhật thất bại!');
                }
            });
        } else {
            this.toastrService.error('Email đã phân quyền, nếu muốn bổ sung quyền thì vào QL admin -> thông tin -> Edit quyền');
        }
    }

    deleteItem(o) {
        const arr = [];
        this.arraySuperAdmin = this.arraySuperAdmin.filter(
            (item) => item !== o
        );
        console.log(this.arraySuperAdmin);
        this.arraySuperAdmin.forEach((i) => {
            RightSuperAdmin.forEach((j) => {
                if (i === j.value) {
                    arr.push(RightAdmin.indexOf(j.permission[1]));
                }
            });
        });
        this.itemAdd.per_id = arr.join(',');
        this.itemAdd.super_admin = this.arraySuperAdmin.join(',');
    }

    async receiveEmp(e) {
        if (e.email && e.email[0] !== '') {
            const dt = await this.empService.superadminListFromRightTb();
            console.log(dt);
            if (dt.includes(e.email[0].toLowerCase())) {
                this.isDisableAdd = true;
            } else {
                this.isDisableAdd = false;
            }
            this.itemAdd.email = e.email[0].toLowerCase();
        }
    }

    deleteRightObject(obj) {
        this.confirmationDialogService
            .confirm('Xác nhận', 'Bạn có chắc chắn xoá dữ liệu này không? ')
            .then((confirmed) => {
                if (confirmed === true) {
                    this.itemAdd.super_admin = '';
                    const content = {
                        user_email: this.authService.getEmailUser(),
                        id_table: obj.email,
                        name_table: TableName.adminTb
                    };
                    this.dataService.deleteData(content).subscribe((res) => {
                        // @ts-ignore
                        if (res.result) {
                            this.toastrService.success('Xoá thành công!');
                        } else {
                            this.toastrService.error('Xoá thất bại!');
                        }
                    });
                }
                this.activeModal.close();
            });
    }

    // isUserRight() {
    //     this.userService.getUserRightAll().subscribe((res) => {
    //         this.rightAdmin = res.superAdmin;
    //     });
    // }
}

class Item {
    email: string;
    // tslint:disable-next-line:variable-name
    per_id: string;
    // tslint:disable-next-line:variable-name
    team_name: string;
    // tslint:disable-next-line:variable-name
    super_admin: string;
    // tslint:disable-next-line:variable-name
    child_depart_right: string;
}
