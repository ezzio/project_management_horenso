import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {ElementTask} from '../../create-project/create-project.component';
import {AuthService} from '../../../../../../../../_services/auth/auth.service';
import {TasksService} from '../../../../../../../../_services/data/tasks.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-point-owner-list',
  templateUrl: './point-task.component.html',
  styleUrls: ['./point-task.component.css']
})
export class PointTaskComponent implements OnInit {
  review: any;
  point = '100';
  element = new ElementTask().createElementTask();
  objCurrent: any;
  pointEvent: EventEmitter<any> = new EventEmitter<any>();
  problem: any;
  assignedAgain = false;
  minDate: any;
  setDateTime: any;
  defaultDay: any;
  constructor(private activeModal: NgbActiveModal, private authService: AuthService,
              private tasksService: TasksService, private calendar: NgbCalendar) {
  }
  ngOnInit(): void {
    console.log(this.objCurrent);
    this.minDate = this.calendar.getToday();
    this.element.id = this.objCurrent.id;
    this.setDateTime = this.objCurrent.deadline;
    Object.keys(this.element).forEach((key) => {
      this.element[key] = this.objCurrent[key];
    });
  }
  close() {
    this.activeModal.close();
  }
  submit(){
    if (this.problem){
      this.element.problem = this.problem;
    }
    this.element.kpi_quality = this.point;
    const content = {
      email: this.authService.getEmailUser(),
      data_task: this.element,
      action: ''
    };
    if (this.review === 'Không đạt'){
      content.action = 'reviewer_todo';
    } else {
      content.action = 'reviewer_done';
    }
    console.log(content);
    this.tasksService.updateKanbanList(content).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res && res.result){
        // @ts-ignore
        const r = res.result;
        if (r.status === 1){
          this.pointEvent.emit({status: 'ok'});
          Swal.fire('Hoàn tất', r.msg, 'success');
        } else {
          Swal.fire('Lỗi', r.msg, 'error');
        }
      } else {
        Swal.fire('Lỗi', 'Lỗi đánh giá công việc', 'error');
      }
    }, error => {
      Swal.fire('Lỗi', 'Lỗi đánh giá công việc', 'error');
    });
    this.activeModal.close();
  }
  emailEvent(e){
    console.log(e);
    this.element.assigned = e.email;
  }

  receiveSDate(str, e){

  }
  receiveSTime(str, e){}
}
