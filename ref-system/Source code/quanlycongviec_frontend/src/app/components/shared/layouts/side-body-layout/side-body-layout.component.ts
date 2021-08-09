import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-side-body-layout',
  templateUrl: './side-body-layout.component.html',
  styleUrls: ['./side-body-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideBodyLayoutComponent implements OnInit {
  @Input() imgAvar = '../../../../../../../../assets/images/img_avatar.png';
  @Input() heightSide = 'sidebar-150';
  constructor() { }

  ngOnInit(): void {
  }
}
