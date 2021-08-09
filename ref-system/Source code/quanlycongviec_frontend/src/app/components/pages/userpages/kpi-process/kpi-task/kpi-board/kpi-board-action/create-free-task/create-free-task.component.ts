import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ElementTask} from '../../create-project/create-project.component';
import {TasksService} from '../../../../../../../../_services/data/tasks.service';
import {AuthService} from '../../../../../../../../_services/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-create-free-task',
  templateUrl: './create-free-task.component.html',
  styleUrls: ['./create-free-task.component.css']
})
export class CreateFreeTaskComponent implements OnInit {
  element = new ElementTask().createElementTask();
  formConfig: any;
  objCurrent: any;
  @Output() changeFreeEvent: EventEmitter<object> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private tasksService: TasksService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log(this.objCurrent);
    this.tasksService.setObjectCurrentToElement(this.element, this.objCurrent);
    this.formConfig = new ElementTask().createFormConfigTask();
    this.formConfig = this.tasksService.getEmailAssigned(this.formConfig, this.objCurrent);
  }

  dataEvent(e) {
    console.log(e);
    this.element = e;
    this.element.owner = this.authService.getEmailUser();
    this.element.type = '0';
    this.element.t_assigned = e.t_assigned;
    this.element.weight = e.weight;
    this.element.assigned = e.assigned.email;
    this.element.reviewer = e.reviewer.email;
    if (!this.element.assigned || !this.element.reviewer){
      Swal.fire('Lỗi', 'Vui lòng kiểm tra lại người đánh giá và người nhận việc', 'error');
    } else {
      console.log(this.element);
      this.tasksService.createProjectFunction(this.element).subscribe((res) => {
        console.log(res);
        if (res) {
          this.changeFreeEvent.emit({status: 'ok'});
        }
      });
    }
  }

  close() {
    this.activeModal.close();
  }


}
