import {Directive, HostListener, Input} from '@angular/core';
import {ExportService} from '../_services/file/export.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService) {
  }

  @Input('appExport') customers: any[];
  @Input() fileName: string;

  @HostListener('click', ['$event']) onClick($event) {
    this.exportService.exportExcel(this.customers, this.fileName);
  }

}
