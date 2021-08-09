import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectTemplateComponent implements OnInit {
  @Input() customControlLabel = 'custom-control-label-80';
  @Input() customSelect = 'custom290';
  @Input() defaultSelect = 'custom-ng';
  @Input() disabled: boolean;
  @Input() title: string;
  @Input() colorText: string;
  @Input() element: string;
  @Input() placeholder: string;
  @Input() multiple: boolean;
  @Input() strElement: any;
  @Input() elementList: any;
  @Input() elementEvent = new EventEmitter<any>();
  @Output() dataEvent = new EventEmitter<any>();
  @Input() keyList: any;
  constructor() { }

  ngOnInit(): void {
    if (this.elementEvent){
      this.elementEvent.subscribe(event => {
        this.element = event;
        this.dataEvent.emit({str: this.strElement, value: this.element});
      });
    }
  }
  dtEvent(str, e){
    this.dataEvent.emit({str, value: e});
  }
  onSelectAll(str){
    this.element = this.elementList.map(item => item);
    this.dataEvent.emit({str, value: this.element});
  }
  onClearAll(str) {
    this.element = null;
    this.dataEvent.emit({str, value: this.element});
  }
  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.emp_name.toLocaleLowerCase().indexOf(term) > -1 || item.email.toLocaleLowerCase().indexOf(term) > -1;
  }

}
