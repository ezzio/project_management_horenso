import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../../_services/data/user.service';

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar-new.component.html',
  styleUrls: ['./sidebar-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarNewComponent implements OnInit {
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
  }
}
