import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksService} from '../../../../../../_services/data/tasks.service';

@Component({
  selector: 'app-kpi-search-project',
  templateUrl: './kpi-search-project.component.html',
  styleUrls: ['./kpi-search-project.component.css']
})
export class KpiSearchProjectComponent implements OnInit {
  rootChosen: any;
  rootList: any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTreeRootList();
  }
  getTreeRootList(){
    this.tasksService.getTaskLists('root').subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res && res.result){
        // @ts-ignore
        this.rootList = res.result.list_task;
      }
    });
  }
  findRoot(){
    console.log(this.rootChosen);
    this.dataEvent.emit(this.rootChosen);
  }

}
