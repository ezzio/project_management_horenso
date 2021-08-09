import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TableName} from '../../_models/constants/tableName';
import {EmpCheckinService} from './empCheckin.service';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    readonly baseUrl = environment.backendUrl;
    newsTb = TableName.newsTb;

    constructor(private http: HttpClient, private empCheckinService: EmpCheckinService) {
    }

    readPdf(path) {
        // return this.http.get(this.baseUrl + '/convert_to_html/' + path);
    }

    getInfo() {
        const query = {query: 'Select * from ' + this.newsTb + ' ORDER BY ngay_dang_bai DESC'};
        return this.empCheckinService.getAll(query);
    }

    getSlide(url) {
        return this.http.get(url, {responseType: 'text'});
    }

    getDetailNews(id) {
        const query = {query: 'Select * from ' + this.newsTb + ' where tin_tuc_id= \'' + id + '\''};
        const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }

    getSomeNews(branch?: any) {
        let query;
        if (!branch) {
            query = {query: 'Select * from ' + this.newsTb + ' where noi_bo = 0 ORDER BY ngay_dang_bai DESC Limit 6'};
        } else if (branch !== '') {
            query = {
                query: 'Select * from ' + this.newsTb + ' where noi_bo = 0' +
                    ' union all Select * from ' + this.newsTb + ' where noi_bo = 1 and chi_nhanh=\'' + branch + '\'' + ' ORDER BY ngay_dang_bai DESC LIMIT 6'
            };
        }

        const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }
    getSomeNewsList(email){
      return this.http.post(this.baseUrl + '/info_tin_tuc', {email}).toPromise();
    }
    getSomeNewsFollowMucluc(value: any, branch?: any) {
        let query;
        if (!branch) {
            query =
                {
                    query: 'Select * from ' + this.newsTb + ' where noi_bo = 0 and muc_luc=\'' + value + '\' ORDER BY ngay_dang_bai DESC'
                };
        } else {
            query =
                {
                    query: 'Select * from ' + this.newsTb + ' where noi_bo = 0 and muc_luc=\'' +
                        value + '\' union all Select * from ' + this.newsTb +
                        ' where noi_bo = 1 and muc_luc=\'' + value + '\' ORDER BY ngay_dang_bai DESC'
                };
        }
        const a = this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }
}
