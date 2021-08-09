import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {PostExample} from '../../../../../../_models/constants/postExample';
import {TableImage, TableNews, TableNewsSmall} from '../../../../../../_models/constants/element/newsItem';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditNewsComponent} from './edit-news/edit-news.component';
import {NewsService} from 'src/app/_services/data/news.service';
import {log} from 'util';
import {base64UrlEncode} from 'angular-oauth2-oidc/base64-helper';
import * as http from 'http';
import {HttpClient} from '@angular/common/http';
import { DataService } from 'src/app/_services/data/data.service';


@Component({
  selector: 'app-control-news',
  templateUrl: './control-news.component.html',
  styleUrls: ['./control-news.component.css']
})
export class ControlNewsComponent implements OnInit {
  tableContent: any;
  tableConfig: any;
  tableContentImg: any;
  tableConfigImg: any;
  tableContentEvent: EventEmitter<object> = new EventEmitter();
  image: any;
  inputComponent = EditNewsComponent;

  constructor(public modalService: NgbModal, private newsService: NewsService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.tableConfig = TableNewsSmall;
    this.refreshTable();
    this.tableContentEvent.emit(this.tableContent);
    this.tableConfigImg = TableImage;
  }
  refreshTable() {
    this.newsService.getInfo().subscribe((res) => {
      this.tableContent = res;
    });
  }
}
