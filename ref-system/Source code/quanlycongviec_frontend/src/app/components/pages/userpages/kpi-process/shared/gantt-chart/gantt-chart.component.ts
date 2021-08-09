import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {gantt} from 'dhtmlx-gantt';
import {TasksService} from '../../../../../../_services/data/tasks.service';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit, OnChanges {
  @ViewChild('gantt_here') ganttContainer: ElementRef;
  data = [];
  @Input() links: any;
  @Input() id: any;
  @Input() dataEvent: EventEmitter<any> = new EventEmitter<any>();
  idTree: any;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {

    this.dataEvent.subscribe((id) => {
        this.idTree = id;
        console.log(this.idTree);
        Promise.all([this.tasksService.getGanttTask(this.idTree)])
          .then(([res]) => {
            console.log(res);
            // @ts-ignore
            const r = res.result.dict_data;
            r.forEach((i) => {
              const obj = {
                id: i.id,
                text: i.title,
                start_date: this.convertDate(i.t_assigned),
                duration: 1,
                parent: i.parent,
                progress: i.completion,
                open: true
              };
              this.data.push(obj);
            });
          });
        this.data = this.data.filter((i) => i.id !== i.parent);
        gantt.parse({data: this.data});
      });
    const el = document.getElementById('gantt_here');
    if (el) {
      gantt.config.xml_date = '%Y-%m-%d %H:%i';
      gantt.init(this.ganttContainer.nativeElement);
    }
  }

  ngOnChanges() {
  }

  convertDate(str) {
    const a = str.split(' ');
    const b = a[0].split('/');
    return [b[2], b[1], b[0]].join('-') + ' ' + a[1];
  }
}
