import {Injectable} from '@angular/core';
import {TableName} from '../../_models/constants/tableName';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    cityTb = TableName.cityTb;
    wardTb = TableName.wardTb;
    districtTb = TableName.districtTb;
    readonly baseUrl = environment.backendUrl;

    constructor(private http: HttpClient) {
    }

    getInfoCity() {
        const query = {
            query: 'Select * from ' + this.cityTb,
        };
        const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }
    getInfoCityDistrict(){
      const a = this.http.post<any>(this.baseUrl + '/t_t_tinh', {_type: 'view'}).toPromise();
      return a;
    }
    getInfoDistrict(value) {
        const query = {
            query: 'Select a.* from ' + this.districtTb + ' a inner join ' + this.cityTb + ' b on a.id_tinh_thanh = b.id_tinh_thanh '
                + ' where tinh_thanh=\'' + value + '\'',
        };
        const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }

    getInfoWard(value) {
        const query = {
            query: 'Select a.* from ' + this.wardTb + ' a inner join ' + this.districtTb + ' b on a.id_quan_huyen = b.id_quan_huyen '
                + ' where quan_huyen=\'' + value + '\'',
        };
        const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }

    getAllWard() {
        const query = {
            query: 'Select distinct quan_huyen from ' + this.districtTb,
        };
        const a = this.http.post<any>(this.baseUrl + '/empCheckin', query).toPromise();
        return a;
    }

    async allWard() {
        const array = [];
        const dt = await this.getAllWard();
        dt.forEach((i) => {
            array.push(i.quan_huyen);
        });
        return array;
    }
}
