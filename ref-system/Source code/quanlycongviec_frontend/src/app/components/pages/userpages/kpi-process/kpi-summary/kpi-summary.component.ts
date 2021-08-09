import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksService} from '../../../../../_services/data/tasks.service';

@Component({
  selector: 'app-kpi-summary',
  templateUrl: './kpi-summary.component.html',
  styleUrls: ['./kpi-summary.component.css']
})
export class KpiSummaryComponent implements OnInit {
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {

  }
}
