import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NewsService } from 'src/app/_services/data/news.service';
import { DataService } from 'src/app/_services/data/data.service';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { ShareService } from '@ngx-share/core';
import {icons} from '../../../_models/constants/icon';
// @ts-ignore
@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailNewsComponent implements OnInit{
  @Input() chinhanh: string;
  fbIcon = faFacebookSquare;
  newsId: any;
  objCurrent: any;
  image: any;
  content: any;
  mobile: boolean;
  constructor(private route: ActivatedRoute, private newsService: NewsService, private dataService: DataService,
              library: FaIconLibrary, public share: ShareService, private router: Router) {
    library.addIcons(...icons);
    // @ts-ignore
  }

  ngOnInit() {
    this.route.params.forEach(async (params: Params) => {
      const dt = await this.newsService.getDetailNews(params.tin_tuc_id);
      this.objCurrent = dt[0];
      console.log(this.objCurrent);
      this.dataService.convertToBase64({mode: 'convert_str', link: this.objCurrent.noi_dung}).subscribe((res) => {
        this.content = res.result;
      });
    });
  }
}
