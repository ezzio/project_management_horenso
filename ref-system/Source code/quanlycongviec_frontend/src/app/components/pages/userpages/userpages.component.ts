import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/data/user.service';

@Component({
  selector: 'app-userpages',
  templateUrl: './userpages.component.html',
  styleUrls: ['./userpages.component.css']
})
export class UserpagesComponent implements OnInit {

  superAdmin: any;
  rightNews: any;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // this.rightUser();
  }

  // rightUser() {
  //   this.userService.isUserRightForUser().subscribe((res) => {
  //     if (res) {
  //       this.superAdmin = res.superAdmin;
  //       this.rightNews = res.newsRight;
  //     }
  //   });
  // }

  isActive(event){
    document.getElementById('profile').classList.remove('is-active');
    document.getElementById('schedule').classList.remove('is-active');
    document.getElementById('stream').classList.remove('is-active');
    document.getElementById('kpi').classList.remove('is-active');
    document.getElementById('adminmanagement').classList.remove('is-active');
    event.target.classList.add('is-active');
}
}
