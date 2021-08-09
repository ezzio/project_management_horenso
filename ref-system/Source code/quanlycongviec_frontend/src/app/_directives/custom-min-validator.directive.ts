import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, ValidatorFn, Validators, AbstractControl} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomMinDirective), multi: true}]
})
export class CustomMinDirective implements Validator {
  // tslint:disable-next-line:variable-name
  private _validator: ValidatorFn;
  @Input() public set min(value: string) {
    this._validator = Validators.min(parseInt(value, 10));
  }

  public validate(control: AbstractControl): { [key: string]: any } {
    return this._validator(control);
  }
}
