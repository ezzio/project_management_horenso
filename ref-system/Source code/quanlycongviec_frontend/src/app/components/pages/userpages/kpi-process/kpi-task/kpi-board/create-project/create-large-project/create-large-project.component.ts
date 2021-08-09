import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../../../../../../_services/auth/auth.service';
import {TasksService} from '../../../../../../../../_services/data/tasks.service';
import {ElementTask} from '../create-project.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-create-large-project',
  templateUrl: './create-large-project.component.html',
  styleUrls: ['./create-large-project.component.css']
})
export class CreateLargeProjectComponent implements OnInit {
  element = new ElementTask().createElementTask();
  formConfig = {
    columns: [
      {type: 'textarea', title: 'Tiêu đề', dataField: 'title', row: 3, required: true},
      {type: 'textarea', title: 'Mô tả', dataField: 'description', row: 5, required: true},
      {type: 'sdatewithtime', title: 'Ngày bắt đầu', dataField: 't_assigned', default: 'today'},
      {type: 'sdatewithtime', title: 'Deadline', dataField: 'deadline', default: 'tmr'},
      {type: 'radio', title: 'Độ ưu tiên', dataField: 'priority', options: [1, 2, 3], nameRadio: 'op1', default: 1},

    ]
  };
  @Output() changeEvent: EventEmitter<object> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal, private authService: AuthService, private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.element.owner = this.authService.getEmailUser();
  }

  submit() {
  }

  close() {
    this.activeModal.close();
  }

  dataEvent(e) {
    this.element = e;
    this.element.type = '1';
    console.log(this.element);
    if (this.element.t_assigned !== '' && this.element.deadline !== ''){
      this.tasksService.createProjectFunction(this.element).subscribe((res) => {
        console.log(res);
        this.changeEvent.emit(res);
      });
    } else {
      Swal.fire('Lỗi', 'Vui lòng kiểm tra lại ngày bắt đầu và ngày hết hạn', 'success');
    }
  }

  closeEvent(e) {
    console.log(e);
    // this.changeEvent.emit(e);
  }

}
