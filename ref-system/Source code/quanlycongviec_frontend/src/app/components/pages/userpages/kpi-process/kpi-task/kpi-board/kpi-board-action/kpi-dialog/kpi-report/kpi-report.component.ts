import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kpi-report',
  templateUrl: './kpi-report.component.html',
  styleUrls: ['./kpi-report.component.css']
})
export class KpiReportComponent implements OnInit {
  objCurrent: any;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.objCurrent);
  }
  close(){
    this.activeModal.close();
  }

}
