import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {
  infoRouterLink = 'control-news';
  sbRouterLink = 'editor-news';
  constructor() { }

  ngOnInit(): void {
  }

}
