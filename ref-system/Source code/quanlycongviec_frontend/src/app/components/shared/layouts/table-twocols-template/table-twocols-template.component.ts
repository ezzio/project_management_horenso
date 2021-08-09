import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-twocols-template',
  templateUrl: './table-twocols-template.component.html',
  styleUrls: ['./table-twocols-template.component.css']
})
export class TableTwocolsTemplateComponent implements OnInit {
  @Input() tableConfig: any;
  @Input() tableContent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
