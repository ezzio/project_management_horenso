import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router, Event} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private titleService: Title, public router: Router,) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle('Sử ký thu đông 2020');
      }
    });
  }

  ngOnInit(): void {

  }

}
