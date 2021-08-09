import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TableName} from '../../_models/constants/tableName';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  readonly baseUrl = environment.backendUrl;
  libraryTb = TableName.libraryTb;
  constructor(private http: HttpClient) { }
  getLibraryList(type, value){
    let condition;
    if (type === 'ma_tai_lieu'){
      condition = ' ma_tai_lieu=\'' + value + '\'';
    }
    if (type === 'ten_tai_lieu'){
      condition = ' ten_tai_lieu LIKE \'%' + value + '%\'';
    }
    if (type === 'loai_tai_lieu'){
       condition = ' loai_tai_lieu=\'' + value + '\'';
    }
    const query = {
       query: 'Select * from ' + this.libraryTb + ' where ' + condition,
    }
    return this.http.post(this.baseUrl + '/empCheckin', query).toPromise();
  }
}
