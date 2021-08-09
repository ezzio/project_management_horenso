import {Component, Host, Input, OnInit} from '@angular/core';
import { CheckboxGroupComponent } from '../checkboxgroup/checkbox-group.component';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() value: any;
  constructor(@Host() private checkboxGroup: CheckboxGroupComponent) { }

  ngOnInit(): void {
  }
  toggleCheck() {
    this.checkboxGroup.addOrRemove(this.value);
  }

  isChecked() {
    return this.checkboxGroup.contains(this.value);
  }

}
