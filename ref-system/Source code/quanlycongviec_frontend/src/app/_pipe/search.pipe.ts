import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchPipe implements PipeTransform {
  // transform(list: any[], filterText: string): any {
  //   return list
  //     ? list.filter(
  //       (item) => item.MBN_account_name.search(new RegExp(filterText, 'i')) > -1
  //     )
  //     : [];
  // }
  transform(items: any[], value: string, label:string): any[] {
    if (!items) return [];
    if (!value) return  items;
    if (value == '' || value == null) return [];
    return items.filter(e => e[label].toLowerCase().indexOf(value) > -1 );

  }
}
