import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-thuvien',
  templateUrl: './admin-thuvien.component.html',
  styleUrls: ['./admin-thuvien.component.css']
})
export class AdminThuvienComponent implements OnInit {
  infoRouterLink = 'info';
  sbRouterLink = 'edit';
  constructor() { }

  ngOnInit(): void {
  }

}
