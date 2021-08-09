import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../../../_services/auth/auth.service';
import {UpdateOwnerListComponent} from '../../kpi-task/kpi-tasklist/update-owner-list/update-owner-list.component';
import {NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TasksService} from '../../../../../../_services/data/tasks.service';
import {KpiReportComponent} from '../../kpi-task/kpi-board/kpi-board-action/kpi-dialog/kpi-report/kpi-report.component';
import {PointTaskComponent} from '../../kpi-task/kpi-board/kpi-board-action/point-task/point-task.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {GeneralService} from '../../../../../../_services/data/general.service';
import {CreateFreeTaskComponent} from '../../kpi-task/kpi-board/kpi-board-action/create-free-task/create-free-task.component';

@Component({
  selector: 'app-kpi-board-filter',
  templateUrl: './kpi-board-filter.component.html',
  styleUrls: ['./kpi-board-filter.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None
})
export class KpiBoardFilterComponent implements OnInit {
  p = 1;
  dateFrom = new Date();
  dateTo = new Date();
  maxDate: Date;
  projectList: any;
  personalTaskList: any;
  state = '';
  priority = '';
  typeTask: any;
  tasks: any;
  @Input() typeList: any;
  @Input() typeUpdate: string;
  content = {
    email: '',
    du_an: '',
    state: '',
    priority: '',
    date_from: '',
    date_to: '',
  };
  tagList = [];
  deadlineList = [];
  tags = [];
  project: any;
  personalTask: any;
  arrIdTree: any;
  color: ThemePalette = 'warn';
  dl: any;
  tagListEvent: EventEmitter<any> = new EventEmitter();
  deadlineListEvent: EventEmitter<any> = new EventEmitter();
  tagChosen: any;
  @Output() openViewEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private authService: AuthService, private generalService: GeneralService,
              private calendar: NgbCalendar,
              private modalService: NgbModal, private tasksService: TasksService) {
    const today = new Date();
    this.dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
  }

  ngOnInit(): void {
    this.getFilterItem();
  }
  dtEvent(e){
    console.log(e);
    this.arrIdTree = e.value;
  }
  getFilterItem(){
    this.tasksService.getFilterSet(this.typeUpdate).subscribe((res) => {
      console.log(res);
      if (res){
        // @ts-ignore
        const r = res.result;
        const pr  = this.getList(r.list_project);
        const per = this.getList(r.list_personal_task);
        this.projectList = pr.concat(per);
        this.deadlineList = r.list_tag.filter(i => i.content === 'Quá hạn' || i.content === 'Còn hạn');
        this.tagList = r.list_tag.filter(i => i.content !== 'Quá hạn' && i.content !== 'Còn hạn');
        this.deadlineListEvent.emit(this.deadlineList);
        this.tagListEvent.emit(this.tagList);
        this.dl = this.deadlineList;
        this.tags = this.tagList;
        this.updateFilter();
      }
    });
  }
  getList(arr){
    const array = [];
    arr.forEach((i) => {
      array.push(i.id);
    });
    return arr;
  }
  convertDate(date){
    const dt = [String(date.getDate()), String(date.getMonth() + 1), date.getFullYear()].join('/');
    return dt;
  }
  changeDeadlineEvent(e){
    this.dl = e.value;
    this.tagChosen = this.dl.concat(this.tags);
  }
  changeTagEvent(e){
    this.tags = e.value;
    this.tagChosen = this.dl.concat(this.tags);
  }
  updateFilter(){
    const t = [];
    if (this.tags){
      this.tags.forEach((i) => {
        t.push(i.content);
      });
    }
    if (this.dl){
      this.dl.forEach((i) => {
        t.push(i.content);
      });
    }
    this.tagChosen = this.dl.concat(this.tags);
    console.log(this.tagChosen);
    const cond = {
      from_date: this.convertDate(new Date(this.dateFrom)),
      to_date: this.convertDate(new Date (this.dateTo)),
    };
    if (this.arrIdTree){
      Object.assign(cond, {id_tree: this.arrIdTree});
    }
    if (this.tagChosen && this.tagChosen.length > 0){
      Object.assign(cond, {tag: t});
    }
    console.log(cond);
    this.tasksService.getTaskListFollowCondition(this.typeUpdate, cond).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res && res.result) {
        // @ts-ignore
        const r = res.result;
        this.tasks = r.list_data;
        console.log(this.tasks);
        console.log(r.list_data);
      }
    });
  }
  assignTask(obj) {
    const modalRef = this.modalService.open(CreateFreeTaskComponent, {size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.changeFreeEvent.subscribe((res) => {
      if (res){
        this.updateFilter();
      }
    });
  }
  updateBox(obj, isTexted?){
    const modalRef = this.modalService.open(UpdateOwnerListComponent, {size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.typeTask = this.typeTask;
    if (isTexted) {
      modalRef.componentInstance.isTexted = true;
    } else {
      modalRef.componentInstance.isTexted = false;
    }
    modalRef.componentInstance.closePopupEvent.subscribe((res) => {
      console.log(res);
      if (res){
        this.updateFilter();
      }
    });
    if (isTexted){
      modalRef.componentInstance.isTexted = isTexted;
    }
  }
  deleteObj(obj){
    const content = {
      email: this.authService.getEmailUser(),
      data_task: obj,
      action: 'cancel'
    };
    console.log(content);
    this.tasksService.updateKanbanFunc(content).subscribe((res) => {
      console.log(res);
    });

  }

  checkComment(obj){
    if (obj.state === 2 && obj.reviewer === this.authService.getEmailUser().toLowerCase()){
      return true;
    } else {
      return false;
    }
  }
  setPoint(obj){
    const modalRef = this.modalService.open(PointTaskComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.pointEvent.subscribe((res) => {
      console.log(res);
      if (res){
        this.updateFilter();
      }
    });
  }
  openView(str, obj){
      this.openViewEvent.emit({type: str, obj});
  }
  checkLengthTitle(str) {
    if (str && str.length < 25) {
      return str;
    } else {
      const a = str.substr(0, 25);
      return a + '...';
    }
  }
}
