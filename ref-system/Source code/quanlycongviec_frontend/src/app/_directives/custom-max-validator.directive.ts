import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, ValidatorFn, Validators, AbstractControl} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomMaxDirective), multi: true}]
})
export class CustomMaxDirective implements Validator {
  // tslint:disable-next-line:variable-name
  private _validator: ValidatorFn;
  @Input() public set max(value: string) {
    this._validator = Validators.max(parseInt(value, 10));
  }
  public validate(control: AbstractControl): { [key: string]: any } {
    return this._validator(control);
  }
}
