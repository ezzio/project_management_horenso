import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateFreeTaskComponent} from '../../kpi-task/kpi-board/kpi-board-action/create-free-task/create-free-task.component';
import {KpiDialogComponent} from '../../kpi-task/kpi-board/kpi-board-action/kpi-dialog/kpi-dialog.component';
import {PointTaskComponent} from '../../kpi-task/kpi-board/kpi-board-action/point-task/point-task.component';
import {UpdateOwnerListComponent} from '../../kpi-task/kpi-tasklist/update-owner-list/update-owner-list.component';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {KpiReportComponent} from '../../kpi-task/kpi-board/kpi-board-action/kpi-dialog/kpi-report/kpi-report.component';
import {TasksService} from '../../../../../../_services/data/tasks.service';
import {AuthService} from '../../../../../../_services/auth/auth.service';

@Component({
  selector: 'app-kpi-board-obs',
  templateUrl: './kpi-board-obs.component.html',
  styleUrls: ['./kpi-board-obs.component.css']
})
export class KpiBoardObsComponent implements OnInit {
  @Input() jobContent: any;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  @Output() changeFreeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeObjCurrentEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() pointEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() closePopupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() btnMobileEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: NgbModal, private tasksService: TasksService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  assignTask(obj) {
    const modalRef = this.modalService.open(CreateFreeTaskComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.changeFreeEvent.subscribe((res) => {
      this.changeFreeEvent.emit({status: 'ok'});
    });
  }

  openDialog(obj) {
    const modalRef = this.modalService.open(KpiDialogComponent, {size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.changeObjCurrentEvent.subscribe((res) => {
      this.changeObjCurrentEvent.emit({status: 'ok'});
    });
  }

  setPoint(obj) {
    const modalRef = this.modalService.open(PointTaskComponent, {size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    modalRef.componentInstance.pointEvent.subscribe((res) => {
      if (res) {
        this.pointEvent.emit({status: 'ok'});
      }
    });
  }

  updateBox(obj, isTexted?) {
    const modalRef = this.modalService.open(UpdateOwnerListComponent, {size: 'lg', backdrop: 'static', keyboard: false, windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
    if (isTexted) {
      modalRef.componentInstance.isTexted = true;
    } else {
      modalRef.componentInstance.isTexted = false;
    }
    modalRef.componentInstance.closePopupEvent.subscribe((res) => {
      this.closePopupEvent.emit({status: 'ok'});
    });
  }

  openConversation(obj) {
    const modalRef = this.modalService.open(KpiReportComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = obj;
  }

  checkLengthTitle(str) {
    if (str && str.length < 15) {
      return str;
    } else {
      const a = str.substr(0, 15);
      return a + '...';
    }
  }

  btnMobile() {
    this.btnMobileEvent.emit({status: 'ok'});
  }

  deleteObj(obj) {
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
}
