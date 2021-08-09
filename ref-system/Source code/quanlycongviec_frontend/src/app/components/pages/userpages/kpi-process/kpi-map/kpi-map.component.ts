import {animate, state, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

import * as kpidata from '../kpi-data.json';

@Component({
  selector: 'app-kpi-map',
  templateUrl: './kpi-map.component.html',
  styleUrls: ['./kpi-map.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class KpiMapComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Element>;
  job = new FormControl();
  jobList = ['Đang Làm','Đã Làm', 'Chưa Làm'];
  columnsToDisplay = ['name', 'progress'];
  expandedElement: Element | null;

  jobElement: Element[] = (kpidata as any).default;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.jobElement);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface Element {
  name: string;
  type: string;
  content: string;
  author: string;
  progress: string;
  level: string;
  time_start: string;
  time_end: string;
}

// const jobElement: Element[] = [
//   {
//     name:'App IOS', type: 'CHƯA LÀM',
//     content:'Nội dung App IOS', author: 'Khoa',
//     progress: Math.round(Math.random() * 100).toString(), level:'3',
//     time_start: 'none', time_end: 'none'
//   },
//   {
//     name:'App 2', type: 'CHƯA LÀM',
//     content:'Nội dung App 2', author: 'Tường',
//     progress: Math.round(Math.random() * 100).toString(), level:'2',
//     time_start: 'none', time_end: 'none'
//   },
//   {
//     name:'Design', type: 'CHƯA LÀM',
//     content:'Nội dung Design', author: 'none',
//     progress: Math.round(Math.random() * 100).toString(), level:'1',
//     time_start: 'none', time_end: 'none'
//   },
//   {
//     name:'App', type: 'ĐANG LÀM',
//     content:'Nội dung App', author: 'Khoa',
//     progress: Math.round(Math.random() * 100).toString(), level:'3',
//     time_start: '8:00', time_end: '9:00'
//   },
//   {
//     name:'Web', type: 'ĐANG LÀM',
//     content:'Nội dung Web', author: 'Linh',
//     progress: Math.round(Math.random() * 100).toString(), level:'2',
//     time_start: '9:00', time_end: '10:00'
//   },
//   {
//     name:'Test', type: 'ĐANG LÀM',
//     content:'Nội dung Test', author: 'Thy',
//     progress: Math.round(Math.random() * 100).toString(), level:'1',
//     time_start: '13:30', time_end: '17:30'
//   },
//   {
//     name:'Game', type: 'ĐÃ LÀM',
//     content:'Nội dung Test', author: 'Ngọc, Toni, Linh',
//     progress: Math.round(Math.random() * 100).toString(), level:'1',
//     time_start: '13:30', time_end: '17:30'
//   },
//   {
//     name:'Chấm công', type: 'ĐÃ LÀM',
//     content:'Tool chấm công', author: 'Ngọc, Toni, Khoa',
//     progress: Math.round(Math.random() * 100).toString(), level:'2',
//     time_start: '8:00', time_end: '17:30'
//   },
//   {
//     name:'Test 2', type: 'ĐÃ LÀM',
//     content:'Nội dung Test 2', author: 'Ngọc, Toni, Linh, Khoa',
//     progress: Math.round(Math.random() * 100).toString(), level:'3',
//     time_start: '10:00', time_end: '17:30'
//   }
// ];

