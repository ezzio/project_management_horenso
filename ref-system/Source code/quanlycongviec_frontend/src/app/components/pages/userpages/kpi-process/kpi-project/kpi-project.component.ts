import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksService} from '../../../../../_services/data/tasks.service';

@Component({
  selector: 'app-kpi-project',
  templateUrl: './kpi-project.component.html',
  styleUrls: ['./kpi-project.component.css']
})
export class KpiProjectComponent implements OnInit {
  constructor(private tasksService: TasksService) { }
  ngOnInit(): void {
  }

}
