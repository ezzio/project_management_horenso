import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TasksService} from '../../../../../../../../_services/data/tasks.service';
import {AuthService} from '../../../../../../../../_services/auth/auth.service';
import {ElementTask} from '../../create-project/create-project.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {KpiReportComponent} from './kpi-report/kpi-report.component';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-kpi-dialog',
  templateUrl: './kpi-dialog.component.html',
  styleUrls: ['./kpi-dialog.component.css']
})
export class KpiDialogComponent implements OnInit {
  color: ThemePalette = 'warn';
  completion = 100;
  reportText: any;
  objCurrent: any;
  element = new ElementTask().createElementTask();
  oldElement = new ElementTask().createElementTask();
  @Output() changeObjCurrentEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private acitveModal: NgbActiveModal, private tasksService: TasksService,
              private authService: AuthService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    console.log(this.objCurrent);
    if (this.objCurrent.completion && this.objCurrent.completion > 0) {
      this.completion = this.objCurrent.completion;
    }
    this.oldElement.completion = this.objCurrent.completion;
    this.element.completion = this.completion;
  }

  close() {
    this.acitveModal.close();
  }

  submit() {
    Object.keys(this.element).forEach((key) => {
      if (this.element[key] === '') {
        this.element[key] = this.objCurrent[key];
      }
    });
    const content = {
      email: this.authService.getEmailUser(),
      data_task: this.element,
      action: 'doing'
    };
    console.log(content);
    this.tasksService.updateKanbanList(content).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res) {
        // @ts-ignore
        const r = res.result;
        if (r.status === 1) {
          this.objCurrent = r.data_new;
          this.changeObjCurrentEvent.emit(this.objCurrent);
          Swal.fire('Hoàn tất', 'Cập nhập thành công', 'success');
        } else {
          Swal.fire('Lỗi', r.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Cập nhập thất bại', 'error');
      }
    }, error => {
      Swal.fire('Lỗi', 'Cập nhập thất bại', 'error');
    });
  }

  changeData(str, e) {
    console.log(str);
    console.log(e);
    if (str === 'completion') {
      this.oldElement[str] = this.objCurrent[str];
      this.element[str] = e;
    }
  }

  openConversation() {
    const modalRef = this.modalService.open(KpiReportComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.objCurrent = this.objCurrent;
  }

}
