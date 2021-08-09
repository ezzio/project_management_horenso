import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportService} from '../../../../_services/file/export.service';
import {SortEvent} from '../../../../_directives/sort.directive';
import {environment} from '../../../../../environments/environment';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-import-or-read',
  templateUrl: './import-or-read.component.html',
  styleUrls: ['./import-or-read.component.css']
})
export class ImportOrReadComponent implements OnInit {
  readonly baseUrl = environment.backendUrl;
  @Input() addOrEditComponent: any;
  @Input() sizeOfAddOrEdit: any;
  @Input() pathDownload: string;
  @Input() inputComponent: any;
  @Input() empImportForm: boolean;
  @Input() empImportBtn: boolean;
  @Input() showButtonOpen: boolean;
  @Input() pathArray: any;
  @Input() categorySalary: any;
  @Input() showSingleImport: boolean;
  @Output() eventOfReadFile = new EventEmitter<SortEvent>();
  @Output() eventSalaryType = new EventEmitter<SortEvent>();
  @Output() eventSalaryCategory = new EventEmitter<SortEvent>();
  public path = '';
  @Input() pathDownloadChosen: EventEmitter<any>;
  constructor(private modalService: NgbModal,
              private exportService: ExportService) { }

  ngOnInit(): void {
    if (this.pathDownloadChosen){
      this.pathDownloadChosen.subscribe(event => {
        this.path =  this.baseUrl + '/files/' + event;
      });
    } else if (this.pathDownload){
      this.path = this.baseUrl + '/files/' + this.pathDownload;
    }
  }
  addOrEdit(obj?){
    const modalRef = this.modalService.open(this.addOrEditComponent, {size: this.sizeOfAddOrEdit, backdrop: 'static'});
    modalRef.componentInstance.obj = obj;
  }
  receiveList(e) {
    this.eventOfReadFile.emit(e);
  }
  receiveSalaryType(e){
    this.eventSalaryType.emit(e);
  }
  categoryEvent(e){
    this.eventSalaryCategory.emit(e);
  }
  openWindow(){}
}
