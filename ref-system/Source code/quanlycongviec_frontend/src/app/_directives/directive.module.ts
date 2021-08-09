import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LazyImgDirective} from './lazyimg.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LazyImgDirective],
  exports: [LazyImgDirective]
})
export class DirectiveModule { }
