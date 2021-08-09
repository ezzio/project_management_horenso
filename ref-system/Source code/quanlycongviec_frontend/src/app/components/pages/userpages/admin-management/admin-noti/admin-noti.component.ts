import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-noti',
  templateUrl: './admin-noti.component.html',
  styleUrls: ['./admin-noti.component.css']
})
export class AdminNotiComponent implements OnInit {
  title = '';
  infoRouterLink = 'info';
  importRouterLink = 'import';
  constructor() { }

  ngOnInit(): void {
  }

}
