import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {QueryService} from '../modify/query.service';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {
    readonly baseUrl = environment.backendUrl;

    constructor(private http: HttpClient, private queryService: QueryService) {
    }

    getInfoSalary(selectItem) {
        const queryStr = this.queryService.queryForSalaryFilter(selectItem);
        const a = this.http.post(this.baseUrl + '/empCheckin', queryStr);
        return {obs: a, query: queryStr};
    }
}
