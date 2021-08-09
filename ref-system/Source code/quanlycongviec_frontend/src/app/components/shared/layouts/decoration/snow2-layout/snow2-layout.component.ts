import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../../../../_services/data/general.service';

@Component({
  selector: 'app-snow2-layout',
  templateUrl: './snow2-layout.component.html',
  styleUrls: ['./snow2-layout.component.css']
})
export class Snow2LayoutComponent implements OnInit {

  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
  }

}
