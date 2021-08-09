import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../../_services/data/admin.service';
import {UserService} from '../../../../../_services/data/user.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  isSuperAdmin: boolean;
  infoRouterLink = 'info';
  adminRouterLink = 'superadmin';
  constructor(private adminService: AdminService, private userService: UserService) { }

  ngOnInit(): void {
    // this.isUserRight();
  }
  // isUserRight(){
  //   this.userService.getUserRightAll().subscribe((res) => {
  //     if (res.superAdmin && res.superAdmin === 'ALL'){
  //       this.isSuperAdmin = true;
  //     }
  //   });
  // }
}
