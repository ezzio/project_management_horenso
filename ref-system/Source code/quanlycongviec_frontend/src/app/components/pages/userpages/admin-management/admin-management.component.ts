import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isActive(event){
    document.getElementById('adminnew').classList.remove('is-active');
    document.getElementById('adminnoti').classList.remove('is-active');
    document.getElementById('management').classList.remove('is-active');
    event.target.classList.add('is-active');
  }
}
