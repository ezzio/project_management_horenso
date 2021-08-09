import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../_services/auth/auth.service';
import {listCategory, listCategoryEng} from '../../../../_models/constants/element/newsItem';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kpi-process',
  templateUrl: './kpi-process.component.html',
  styleUrls: ['./kpi-process.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KpiProcessComponent implements OnInit {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      // @ts-ignore
      if (event.url) {
        // @ts-ignore
        const a = event.url.split('/')[3];
        console.log(a);
        document.getElementById(a).classList.add('is-active');
      }
    });
  }

  ngOnInit(): void {
  }

  isActive(event){
    document.getElementById('board').classList.remove('is-active');
    document.getElementById('tasklist').classList.remove('is-active');
    document.getElementById('projectlist').classList.remove('is-active');
    // document.getElementById('baocao').classList.remove('is-active');
    event.target.classList.add('is-active');
  }
}

