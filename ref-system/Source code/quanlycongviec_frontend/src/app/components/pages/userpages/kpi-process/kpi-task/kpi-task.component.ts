import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../_services/auth/auth.service';

@Component({
  selector: 'app-kpi-task',
  templateUrl: './kpi-task.component.html',
  styleUrls: ['./kpi-task.component.css']
})
export class KpiTaskComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isActive(event) {
  }
}
