import {AfterViewInit, Component, OnInit} from '@angular/core';
import {KpiDialogComponent} from './kpi-board-action/kpi-dialog/kpi-dialog.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormControl} from '@angular/forms';
import {ViewportScroller} from '@angular/common';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateProjectComponent} from './create-project/create-project.component';
import {TasksService} from '../../../../../../_services/data/tasks.service';
import {ThemePalette} from '@angular/material/core';
import {AuthService} from '../../../../../../_services/auth/auth.service';
import {ConfirmationDialogService} from '../../../../../shared/confirmation-dialog/confirmation-dialog.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-kpi-board',
  templateUrl: './kpi-board.component.html',
  styleUrls: ['./kpi-board.component.css']
})

export class KpiBoardComponent implements OnInit, AfterViewInit {
  searchText: string;
  level = new FormControl();
  levels = ['1', '2', '3'];
  number = ['3', '2', '1', '0'];
  jobcontents: any;
  progressbarValue: any;
  color: ThemePalette = 'warn';
  disableDrag: any;
  jobOcontents: any;
  typeBoard: any;
  mobile = true;

  constructor(private modalService: NgbModal, private viewportScroller: ViewportScroller,
              private tasksService: TasksService,
              private authService: AuthService,
              private confirmationDialogService: ConfirmationDialogService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getInfoKanban();
  }

  ngAfterViewInit() {
    this.diableDrag();
  }

  getInfoKanban() {
    this.tasksService.getKanbanList().subscribe((res) => {
      // @ts-ignore
      if (res && res.result && res.result.status === 1) {
        // @ts-ignore
        const r = res.result;
        this.number = [r.list_to_do.length, r.list_doing.length, r.list_waiting.length, r.list_done.length];
        this.jobcontents = [
          {type: 'Cần làm', job: this.getTaskList(r.list_to_do), count: r.list_to_do.length, nameClass: 'board-inner-1', nameClassPost: 'board-post-1', nameClassType: 'board-type-1'},
          {type: 'Đang làm', job: this.getTaskList(r.list_doing), count: r.list_doing.length, nameClass: 'board-inner-2', nameClassPost: 'board-post-2', nameClassType: 'board-type-2'},
          {type: 'Chờ đánh giá', job: this.getTaskList(r.list_waiting), count: r.list_waiting.length, nameClass: 'board-inner-3', nameClassPost: 'board-post-3', nameClassType: 'board-type-3'},
          {type: 'Hoàn tất', job: this.getTaskList(r.list_done), count: r.list_done.length, nameClass: 'board-inner-4', nameClassPost: 'board-post-4', nameClassType: 'board-type-4'},
        ];
      }
    });
  }

  getTaskList(arr) {
    const a = [];
    arr.forEach((i) => {
      a.push(i.data_task);
    });
    return a;
  }

  drop(event: CdkDragDrop<string[]>, str) {
    console.log(str);
    if (window.innerWidth > 768) {
      if ((event.container.id === 'cdk-drop-list-3' || event.container.id === 'cdk-drop-list-2')
        && event.previousContainer.id === 'cdk-drop-list-0') {
        Swal.fire('Lỗi', 'Bạn đang ở bước cần làm, chỉ được cập nhập sang bước Đang làm', 'error');
      } else if ((event.container.id === 'cdk-drop-list-0' || event.container.id === 'cdk-drop-list-3')
        && event.previousContainer.id === 'cdk-drop-list-1') {
        Swal.fire('Lỗi', 'Bạn đang ở bước Đang làm, chỉ được cập nhập sang bước Chờ review', 'error');
      } else if (event.previousContainer.id === 'cdk-drop-list-2') {
        Swal.fire('Lỗi', 'Bạn đang ở bước Chờ review, không được phép cập nhập trạng thái', 'error');
      } else {
        const dataPrevious = event.previousContainer.data[event.previousIndex];
        this.typeToUpdate(dataPrevious, str);
      }
    }
  }

  typeToUpdate(obj, str, event?) {
    const dialogConfirm = 'Xác nhận thay đổi trạng thái?';
    this.confirmationDialogService
      .confirm('Xác nhận', dialogConfirm)
      .then((confirmed) => {
        if (confirmed === true) {
          const content = {
            email: this.authService.getEmailUser(),
            data_task: obj,
            action: ''
          };
          switch (str) {
            case 'Đang làm':
              content.action = 'todo_doing';
              this.updateData(content, event);
              break;
            case 'Chờ đánh giá': {
              content.action = 'doing_reviewer';
              // @ts-ignore
              if (obj.completion < 100) {
                this.confirmationDialogService
                  .confirm('Xác nhận', 'Mức độ hoàn thiện của bạn chưa đạt 100%, bạn có xác nhận chuyển sang trạng thái chờ revew?')
                  .then((confirmedOther) => {
                    if (confirmedOther === true) {
                      this.updateData(content, event);
                    }
                  });
              } else {
                this.updateData(content, event);
              }
              break;
            }
          }
        }
      });
  }

  updateData(content, event?) {
    this.tasksService.updateKanbanList(content).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res && res.result && res.result.status === 1) {
        // @ts-ignore
        if (res.result.status === 1) {
          if (event) {
            if (event.previousContainer === event.container) {
              moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            } else {
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
              // @ts-ignore
              event.container.data[event.currentIndex] = res.result.data_new;
            }
          }
          this.getInfoKanban();
        } else {
          // @ts-ignore
          Swal.fire('Lỗi', res.result.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Lỗi cập nhập, vui lòng thử lại', 'error');
      }
    });
  }

  createJob() {
    const modalRef = this.modalService.open(CreateProjectComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.changeEvent.subscribe((res) => {
      if (res && res.status) {
        this.getInfoKanban();
      }
    });
  }

  diableDrag() {
    if (window.innerWidth > 768) {
      this.disableDrag = 0;
    } else {
      this.disableDrag = 100000000;
    }
  }

  resetBoard(e) {
    if (e) {
      this.getInfoKanban();
    }
  }

  btnMobileEvent(e, str, obj) {
    console.log(e);
    console.log(str);
    console.log(obj);
    if (e) {
      this.typeToUpdate(obj, str);
    }
  }
}
