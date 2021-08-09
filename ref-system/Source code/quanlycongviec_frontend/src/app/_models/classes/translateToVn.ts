import {TranslateVn} from '../constants/englishVietnamese';
import {TranslateEnglish} from '../constants/vietnameseEnglish';
import {arrayify} from 'tslint/lib/utils';

export class TranslateToVn {
  engVn = TranslateVn;
  elementList: any;

  constructor(list: any) {
    this.elementList = list;
  }

  translateAction() {
    const arr = [];
    if (this.elementList) {
      this.elementList.forEach((item) => {
        const arrayObj = {};
        Object.keys(item).forEach((key) => {
          Object.keys(this.engVn).forEach((keyEng) => {
            if (key === keyEng) {
              Object.assign(arrayObj, {[this.engVn[keyEng]]: item[key]});
            }
          });
        });
        arr.push(arrayObj);
      });
      return arr;
    }
  }
}

export class TranslateToEng {
  vnEng = TranslateEnglish;
  elementList: any;
  elementObj: object;

  constructor(list?: any, obj?: object) {
    this.elementList = list;
    this.elementObj = obj;
  }

  translateAction() {
    if (this.elementList) {
      this.elementList.forEach((item) => {
        Object.keys(item).forEach((key) => {
          Object.keys(this.vnEng).forEach((keyEng) => {
            if (key === keyEng) {
              item[this.vnEng[keyEng]] = item[key];
              delete item[key];
            }
          });
        });
      });
      return this.elementList;
    }
    if (this.elementObj) {
      Object.keys(this.elementObj).forEach((key) => {
        Object.keys(this.vnEng).forEach((keyEng) => {
          if (key === keyEng) {
            this.elementObj[this.vnEng[keyEng]] = this.elementObj[key];
            delete this.elementObj[key];
          }
        });
      });
      return this.elementObj;
    }
  }
}

export class TranslateObjToVn {
  engVn = TranslateVn;
  elementObj: any;

  constructor(obj: any) {
    this.elementObj = obj;
  }

  translateAction() {
    const arrayObj = {};
    Object.keys(this.elementObj).forEach((key) => {
      Object.keys(this.engVn).forEach((keyEng) => {
        if (key === keyEng) {
          Object.assign(arrayObj, {[this.engVn[keyEng]]: this.elementObj[key]});
        }
      });
    });
  }
}
