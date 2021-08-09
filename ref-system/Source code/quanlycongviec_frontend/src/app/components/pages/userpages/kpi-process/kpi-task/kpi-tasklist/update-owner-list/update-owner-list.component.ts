import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ElementTask} from '../../kpi-board/create-project/create-project.component';
import {TasksService} from '../../../../../../../_services/data/tasks.service';
import {AuthService} from '../../../../../../../_services/auth/auth.service';
import {KpiReportComponent} from '../../kpi-board/kpi-board-action/kpi-dialog/kpi-report/kpi-report.component';

@Component({
  selector: 'app-update-owner-list',
  templateUrl: './update-owner-list.component.html',
  styleUrls: ['./update-owner-list.component.css']
})
export class UpdateOwnerListComponent implements OnInit {
  formConfig: any;
  element = new ElementTask().createElementTask();
  objCurrent: any;
  typeTask: any;
  projectList: any;
  project: any;
  title = 'Cập nhập thông tin';
  isTexted: boolean;
  @Output() closePopupEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(public activeModal: NgbActiveModal, private tasksService: TasksService,
              private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.objCurrent);
    if (this.isTexted){
      this.title = 'Thông tin chi tiết';
    } else {
      if (this.objCurrent.state === 2){
        this.title = 'Task đang ở trạng thái chờ đánh giá';
      }
    }
    this.formConfig = {
      columns: [
        {type: 'textarea', title: 'Tiêu đề', dataField: 'title', row: '3'},
        {type: 'textarea', title: 'Mô tả', dataField: 'description', row: '5'},
        {type: 'sdatewithtime', title: 'Ngày kết thúc', dataField: 'deadline'},
        {type: 'multiplenumber', title: 'Hoàn thành trong', dataField: 't_duration'},
        {type: 'slider', title: 'Tỉ trọng công việc', dataField: 'weight'},
        {type: 'radio', title: 'Độ ưu tiên', dataField: 'priority', options: [1, 2, 3], nameRadio: 'opt'},
      ]
    };
    if (this.objCurrent.type === 3){
      this.formConfig.columns.push(
        {type: 'doubleselect', title: 'Người nhận việc', dataField: 'assigned'},
        {type: 'doubleselect', title: 'Người đánh giá', dataField: 'reviewer'}
      );
    }
    this.getProjectList();
    this.formConfig = this.tasksService.getEmailAssigned(this.formConfig, this.objCurrent, true);
  }
  dataEvent(e){
    this.element = this.objCurrent;
    this.element.title = e.title;
    this.element.description = e.description;
    this.element.deadline = e.deadline;
    this.element.t_duration = e.t_duration;
    this.element.weight = e.weight;
    const content = {
      email: this.authService.getEmailUser(),
      data_task: this.element,
      action: 'edit'
    };
    console.log(content);
    this.tasksService.updateKanbanFunc(content).subscribe((res) => {
      if (res){
        this.activeModal.close();
        this.closePopupEvent.emit(e);
      }
    });
  }
  closeEvent(e){
    this.closePopupEvent.emit(e);
  }
  getProjectList(){
    this.tasksService.getTaskLists('current').subscribe((res) => {
      // @ts-ignore
      this.projectList = res.result.list_task;
    });
  }
  showConversation(){
    const modalRef = this.modalService.open(KpiReportComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = this.objCurrent;
  }
}
