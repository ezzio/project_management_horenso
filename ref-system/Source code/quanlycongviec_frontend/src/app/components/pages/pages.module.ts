import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PagesComponent} from './pages.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MainpagesModule} from './mainpages/mainpages.module';
import {UserPagesModule} from './userpages/userpages.module';
import {BookComponent} from './book/book.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    PagesComponent,
    BookComponent,
  ],
  imports: [
    CommonModule,
    MainpagesModule,
    UserPagesModule,
    SharedModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  exports: [
    PagesComponent
  ],
})
export class PagesModule { }
