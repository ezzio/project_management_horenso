import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TasksService} from '../../../_services/data/tasks.service';

@Component({
  selector: 'app-select-depart-email',
  templateUrl: './select-depart-email.component.html',
  styleUrls: ['./select-depart-email.component.css']
})
export class SelectDepartEmailComponent implements OnInit {
  @Input() defaultObj: any;
  @Input() title: any;
  @Input() formLabel = 'label_create_task';
  childDepartList: any;
  resultOfGetEmail: any;
  emailList: any;
  @Output() emailEvent: EventEmitter<any> = new EventEmitter<any>();
  elementEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private tasksService: TasksService) { }

  async ngOnInit() {
    await this.getChildDepart();
    this.emailList = this.getEmailFromChild(this.defaultObj.child_depart, this.resultOfGetEmail.result.dict_info_assigned);
    this.emailEvent.emit(this.defaultObj);
  }
  dt1Event(e){
    this.emailList = this.getEmailFromChild(e.value, this.resultOfGetEmail.result.data);
  }
  dt2Event(e){
    console.log(e);
    this.emailEvent.emit(e.value);
  }
  async getChildDepart(){
    // @ts-ignore
    this.resultOfGetEmail = await this.tasksService.getEmailAndChildDepart();
    console.log(this.resultOfGetEmail);
    this.childDepartList = await this.resultOfGetEmail.result.list_assigned;
  }
  getEmailFromChild(str, arr){
    return arr[str];
  }
}
