/* tslint:disable:quotemark */
import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {TasksService} from '../../../../../../_services/data/tasks.service';
import {gantt} from 'dhtmlx-gantt';

@Component({
  selector: 'app-kpi-ganttmap',
  templateUrl: './kpi-ganttmap.component.html',
  styleUrls: ['./kpi-ganttmap.component.css']
})
export class KpiGanttmapComponent implements OnInit {
  @ViewChild('gantt_here') ganttContainer: ElementRef;
  @Input() idTree: any;
  MS_PER_DAY = 1000 * 60 * 60 * 24;

  bigData: any;

  data = [];
  links = [];
  dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    // this.idTree = e.id;
    const dt = await this.tasksService.getGanttTask(this.idTree);
    console.log(dt);
    // @ts-ignore
    const r = dt.result.dict_data;
    r.forEach((i) => {
      const obj = {
        id: i.id.toString(),
        text: i.title,
        start_date: this.convertDate(i.t_assigned),
        duration: this.getDuration(i.t_assigned, i.deadline),
        parent: i.parent.toString()
      };
      this.data.push(obj);
    });
    if (this.data) {
      console.log(this.data);
      gantt.config.xml_date = '%d-%m-%Y ';
      gantt.init('gantt_here');
      this.data.forEach((i) => {
        if (i.id === i.parent){
          delete i.parent;
        }
      });
      gantt.i18n.setLocale({
        date: {
          month_full: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
            'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          month_short: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']
        },
        labels: {
          /* grid columns */
          column_wbs: 'WBS',
          column_text: 'Tên công việc',
          column_start_date: 'Bắt đầu',
          column_duration: 'Số ngày',
        }
      });
      gantt.parse({data: this.data});


    }

  }

  // getGanttData() {
  //   this.tasksService.getTreeTask(this.idTree, 'gantt').subscribe((res) => {
  //     console.log(res);
  //     // @ts-ignore
  //     if (res && res.result) {
  //       // @ts-ignore
  //       const r = res.result.dict_data;
  //       r.forEach((i) => {
  //         const obj = {
  //           id: i.id,
  //           text: i.title,
  //           start_date: this.convertDate(i.t_assigned),
  //           duration: 1,
  //           parent: i.parent,
  //           progress: i.completion,
  //           open: true
  //         };
  //         this.data.push(obj);
  //       });
  //       this.data = this.data.filter((i, index) => index !== 0);
  //       this.dataEvent.emit(this.data);
  //     }
  //   });
  // }

  convertDate(str) {
    const a = str.split(' ');
    const b = a[0].split('/');
    return [b[0], b[1], b[2]].join('-');
  }


  getDuration(start, end) {
    const a = start.split(' ');
    const b = end.split(' ');
    const atime = new Date(a[0].split('/')[2], a[0].split('/')[1], a[0].split('/')[0]);
    const btime = new Date(b[0].split('/')[2], b[0].split('/')[1], b[0].split('/')[0]);
    return Math.round((btime.valueOf() - atime.valueOf()) / (60 * 60 * 1000 * 24));

  }


}
