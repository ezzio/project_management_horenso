import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import {TasksService} from '../../../../../../../_services/data/tasks.service';
import {CreateLargeProjectComponent} from './create-large-project/create-large-project.component';
import {AuthService} from '../../../../../../../_services/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  hasProject = false;
  project: any;
  projectList: any;
  isShowDes: boolean;
  isCreateOther: boolean;
  element = new ElementTask().createElementTask();
  elementFree = new ElementTask().createElementTask();
  formConfig: any;
  formFreeConfig: any;
  assignedList: any;
  reviewerList: any;
  formConfigEvent: EventEmitter<object> = new EventEmitter();
  formFreeConfigEvent: EventEmitter<object> = new EventEmitter();
  isContinue: boolean;
  @Output() changeEvent: EventEmitter<object> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private authService: AuthService,
              private tasksService: TasksService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getForm();
    this.getTaskList();
  }
  optionEvent(value, event) {
    document.getElementById('notproject').classList.remove('is-active');
    document.getElementById('isproject').classList.remove('is-active');
    event.target.classList.add('is-active');
    this.hasProject = value;
    this.isContinue = false;
  }
  getForm() {
    this.formFreeConfig = new ElementTask().createFormConfigFreeTask();
    this.formFreeConfig.columns = this.formFreeConfig.columns.filter(i => i.dataField !== 'weight');
  }


  getTaskList(idProject?) {
    this.tasksService.getTaskLists('project').subscribe((res) => {
      // @ts-ignore
      if (res && res.result) {
        // @ts-ignore
        const r = res.result;
        this.projectList = r.list_project;
        this.projectList.forEach((i) => {
          if (r.dict_info_project[i.id.toString()]){
            Object.assign(i, {child: r.dict_info_project[i.id.toString()]});
          }
        });
        console.log(this.projectList);
        // if (idProject) {
        //   const a = this.projectList.filter((i) => i.id_tree === idProject);
        //   this.project = a[0];
        // }
      }
    });
  }
  createOther() {
    this.isCreateOther = true;
    const modalRef = this.modalService.open(CreateLargeProjectComponent, {windowClass: 'my-dialog'});
    modalRef.componentInstance.changeEvent.subscribe((res) => {
      if (res) {
        this.getTaskList(res.id_tree);
      }
    });
  }

  continue() {
    this.isShowDes = true;
  }
  dataFreeEvent(e){
    this.elementFree.owner = this.authService.getEmailUser();
    this.elementFree.type = '2';
    this.elementFree.parent = null;
    this.elementFree.id_tree = null;
    this.elementFree.assigned = this.authService.getEmailUser();
    this.tasksService.createProjectFunction(this.elementFree).subscribe((res) => {
      if (res) {
        this.changeEvent.emit({status: 'ok'});
      }
    });
  }
  dataEvent(e) {
    console.log(e);
    this.element = e;
    this.element.owner = this.authService.getEmailUser();
    this.element.weight = e.weight;
    this.element.t_assigned = e.t_assigned;
    this.element.assigned = e.assigned.email;
    this.element.reviewer = e.reviewer.email;
    this.element.type = '0';
    this.tasksService.createProjectFunction(this.element).subscribe((res) => {
      if (res) {
        this.changeEvent.emit({status: 'ok'});
      }
    });
  }

  closeEvent(e) {
    this.activeModal.close();
  }
  goToContinue(c){
    console.log(c);
    this.project = c;
    this.tasksService.setObjectCurrentToElement(this.element, c);
    this.formConfig = new ElementTask().createFormConfigTask();
    this.formConfig = this.tasksService.getEmailAssigned(this.formConfig, c);
    this.formConfig.columns = this.formConfig.columns.filter(i => i.dataField !== 'weight');
    console.log(this.formConfig);
    this.isContinue = true;
  }

  dropDownTask(event){
    const a = document.getElementById('title-root').classList;
    const b = Array.from(a);
    let c = 0;
    console.log(c);
    // tslint:disable-next-line:only-arrow-functions
    b.forEach(function(item) {
      if (item === 'plus-icon2') {
        a.remove('plus-icon2');
        c = 1;
      }
    });
    // tslint:disable-next-line:no-conditional-assignment
    if (c !== 1) {
      document.getElementById('title-root').classList.add('plus-icon2');
    }
  }
}

export class ElementTask {
  createElementTask() {
    return {
      assigned: '',
      completion: 0,
      data_root: '',
      deadline: '',
      description: '',
      id: '',
      id_tree: '',
      kpi_quality: '',
      kpi_time: '',
      level: '',
      owner: '',
      parent: '',
      priority: '',
      problem: '',
      progression: '',
      reviewer: '',
      state: '',
      t_assigned: '',
      t_create: '',
      t_duration: '',
      te: '',
      title: '',
      ts: '',
      type: '',
      uuid: '',
      weight: 100,
      weight_normalized: '',
      phong_ban: ''
    };
  }

  createFormConfigTask() {
    return {
      columns: [
        {type: 'textarea', title: 'Tiêu đề công việc con', dataField: 'title', row: 3, required: true},
        {type: 'textarea', title: 'Mô tả', dataField: 'description', row: 5, required: true},
        {type: 'doubleselect', title: 'Người nhận việc', dataField: 'assigned', required: true},
        {type: 'sdatewithtime', title: 'Ngày bắt đầu', dataField: 't_assigned', required: true},
        {type: 'sdatewithtime', title: 'Deadline', dataField: 'deadline', required: true},
        {type: 'multiplenumber', title: 'Hoàn thành trong', dataField: 't_duration', required: true},
        {type: 'doubleselect', title: 'Người đánh giá', dataField: 'reviewer', required: true, default: true},
        {type: 'slider', title: 'Tỉ trọng công việc', dataField: 'weight', default: true, required: true},
        {type: 'radio', title: 'Độ ưu tiên', dataField: 'priority', options: [1, 2, 3], nameRadio: 'op', default: 1, required: true},
      ]
    };
  }
  createFormConfigFreeTask() {
    return {
      columns: [
        {type: 'textarea', title: 'Tiêu đề', dataField: 'title', row: 3, required: true},
        {type: 'textarea', title: 'Mô tả', dataField: 'description', row: 5, required: true},
        {type: 'sdatewithtime', title: 'Ngày bắt đầu', dataField: 't_assigned', default: 'today', required: true},
        {type: 'sdatewithtime', title: 'Deadline', dataField: 'deadline', default: 'tmr', required: true},
        {type: 'multiplenumber', title: 'Hoàn thành trong', dataField: 't_duration', required: true},
        {type: 'slider', title: 'Tỉ trọng công việc', dataField: 'weight', required: true},
        {type: 'radio', title: 'Độ ưu tiên', dataField: 'priority', options: [1, 2, 3], nameRadio: 'op', default: 1, required: true},
      ]
    };
  }
}
