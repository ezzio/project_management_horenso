import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CreateLargeProjectComponent} from '../../kpi-task/kpi-board/create-project/create-large-project/create-large-project.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kpi-projectlist',
  templateUrl: './kpi-projectlist.component.html',
  styleUrls: ['./kpi-projectlist.component.css'],
})
export class KpiProjectlistComponent implements OnInit {
  isOpenedTree: boolean;
  isOpenedGantt: boolean;
  idTree: any;
  objCurrent: any;
  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }
  createProject() {
    const modalRef = this.modalService.open(CreateLargeProjectComponent, {size: 'lg', windowClass: 'my-dialog'});
    modalRef.componentInstance.changeEvent.subscribe((res) => {
      console.log(res);
    });
  }
  openViewEvent(e){
    console.log(e);
    if (e.type === 'tree'){
      this.isOpenedTree = true;
      this.isOpenedGantt = false;
    } else  if (e.type === 'gantt') {
      this.isOpenedTree = false;
      this.isOpenedGantt = true;
    }
    this.idTree = e.obj.id_tree;
    this.objCurrent = e.obj;
  }

}
