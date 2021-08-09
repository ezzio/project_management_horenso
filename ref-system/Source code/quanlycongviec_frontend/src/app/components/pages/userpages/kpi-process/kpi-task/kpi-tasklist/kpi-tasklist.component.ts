import { Component, OnInit } from '@angular/core';
import {TasksService} from '../../../../../../_services/data/tasks.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateOwnerListComponent} from './update-owner-list/update-owner-list.component';
import {PointTaskComponent} from '../kpi-board/kpi-board-action/point-task/point-task.component';
import {AuthService} from '../../../../../../_services/auth/auth.service';
import {KpiReportComponent} from '../kpi-board/kpi-board-action/kpi-dialog/kpi-report/kpi-report.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kpi-tasklist',
  templateUrl: './kpi-tasklist.component.html',
  styleUrls: ['./kpi-tasklist.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class KpiTasklistComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
  }
}
