import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TasksService} from '../../../../../../_services/data/tasks.service';
import {AuthService} from '../../../../../../_services/auth/auth.service';

@Component({
  selector: 'app-kpi-comment',
  templateUrl: './kpi-comment.component.html',
  styleUrls: ['./kpi-comment.component.css']
})
export class KpiCommentComponent implements OnInit, AfterViewChecked {
  comment: any;
  @Input() placeholderText: any;
  @Input() objCurrent: any;
  dataCmt: any;
  userEmail: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(private tasksService: TasksService, private authService: AuthService) { }

  ngOnInit(): void {
    this.scrollToBottom();
    this.dataCmt = this.objCurrent.data_cmt;
    this.userEmail = this.authService.getEmailUser().toLowerCase();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  submit(){
    const content = {
      email : this.authService.getEmailUser(),
      id_task : this.objCurrent.id,
      cmt: this.comment
  };
    console.log(content);
    this.tasksService.sentReport(content).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res && res.result){
        // @ts-ignore
        const r = res.result;
        if (r.status === 1){
          this.dataCmt = r.data_cmt;
        }
      }
    });
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
