import { Injectable } from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  convertNumber(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  counterFromNtoM(start, end) {
    const foo = [];
    for (let i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }
  calculateMonthYear(str) {
    const a = str.split('-');
    const b = (Number(a[1]) - 1) * 12 + Number(a[0]);
    return b;
  }

  convertName(str){
    const strSplit = str.split(' ');
    for (let i = 0; i < strSplit.length; i++){
      strSplit[i] = strSplit[i].charAt(0).toUpperCase() + strSplit[i].substring(1);
    }
    return strSplit.join(' ');
  }
  convertDate(newValue, str) {
    if (newValue[str] !== null && newValue[str].includes(', ')) {
      const a = new Date(newValue[str]).toLocaleString();
      const b = a.split(', ');
      if (b[0].includes(':')) {
        newValue[str] = b[1];
      } else {
        newValue[str] = b[0];
      }
    }
  }
  convertStrToNgbDate(str){
    const d = str.split('/');
    return new NgbDate(Number(d[2]), Number(d[1]), Number(d[0]));
  }
  convertDateStrToSecond(str){
    if (str && str !== ''){
      const d = str.split(' ');
      const da = d[0].split('/');
      const t = new Date(Number(da[2]),  Number(da[1]), Number(da[0])).getTime();
      return t;
    }
  }
}
