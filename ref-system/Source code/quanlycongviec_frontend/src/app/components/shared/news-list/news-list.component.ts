import {Component, Input, OnInit} from '@angular/core';
import { NewsService } from 'src/app/_services/data/news.service';
import { DataService } from 'src/app/_services/data/data.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  readonly imgUrl = environment.img + 'img/frontend/';
  newsList: any;
  branchUser: any;
  @Input() isShowVideo: boolean;
  @Input() isShowPage: boolean;
  @Input() flexWidth = 'flexWidth100';
  constructor(private newsService: NewsService, private dataService: DataService,
              private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.getSomeNews();
  }
  async getSomeNews(){
    let email = 'abc';
    if (this.authService.getEmailUser()){
      email = this.authService.getEmailUser();
    };
    const dt = await this.newsService.getSomeNewsList(email);
    console.log(dt);
    // @ts-ignore
    this.newsList = dt.data;
    this.newsList = this.newsList.filter(
      (item) => item.hieu_luc === 1
    );
    for (const i of this.newsList) {
      let a;
      if (i.link.includes('mobile')){
        Object.assign(i, {linkUrl: '/api/auth/truyenthong/news/' + this.convertLink(i.link)});
      } else {
        const b = i.link.split('/mytinpnc.vn');
        Object.assign(i, {linkUrl: b[1]});
      }
      if (i.hinh_anh !== ''){
        a = i.hinh_anh.split('/')[9];
      } else {
        a = 'default.jpeg';
      }
      if (a) {
        // const b = 'data:image/png;base64, ' + a.result;
        const b = 'https://mytinpnc.vn/data/news/' + a;
        Object.assign(i, {img: b});
      }
    }
  }

  convertLink(str){
    const a = str.split('/mobile');
    return a[1];
  }

  gotoPage(){
    this.router.navigate(['/su-ky-thu-dong'], {relativeTo: this.route});
  }
  gotovideo(){
    this.router.navigate(['/api/auth/stream/stco_diet_giac_corona'], {relativeTo: this.route});
  }
  trackByFn(index, item) {
    return index;
  }
  gotoLacso(){
    this.router.navigate(['/api/auth/game/lacso'], {relativeTo: this.route});
  }
}
