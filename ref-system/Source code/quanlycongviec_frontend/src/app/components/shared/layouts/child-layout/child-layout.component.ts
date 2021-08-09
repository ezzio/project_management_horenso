import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-child-layout',
  templateUrl: './child-layout.component.html',
  styleUrls: ['./child-layout.component.css']
})
export class ChildLayoutComponent implements OnInit {
  @Input() notPad: boolean;
  @Input() homeSetup = 'homeSetup-default';
  @Input() title: string;
  @Input() infoRouterLink: string;
  @Input() sbRouterLink: string;
  @Input() noteRouterLink: string;
  @Input() importRouterLink: string;
  @Input() adminRouterLink: string;
  @Input() createRouterLink: string;
  @Input() commentRouterLink: string;
  @Input() nameOfLeft: string;
  @Input() nameOfRight: any;
  @Input() showImportButton: boolean;
  @Input() showSBButton: boolean;
  @Input() showInfoButton = true;
  @Input() showGhinhanButton = false;
  @Input() showAdminButton = false;
  @Input()  showCreateButton = false;
  @Input() showCommmentButton = false;
  @Input() classOfCard: any;
  @Output() eventIClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit(): void {
  }
  eventInfoClick(e){
    this.eventIClick.emit(e);
  }
}
