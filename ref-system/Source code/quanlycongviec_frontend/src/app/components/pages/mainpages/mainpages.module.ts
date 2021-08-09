import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainpagesRoutingModule} from './mainpages-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {NgbdSortableHeader} from '../../../_directives/sort.directive';
import {OpenviduSessionModule} from 'openvidu-angular';
import {UserPagesModule} from '../userpages/userpages.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTableFilterModule} from 'mat-table-filter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {CalendarModule, DatePickerModule, DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgSelectModule} from '@ng-select/ng-select';
import {ScheduleModule} from '@syncfusion/ej2-angular-schedule';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import {NgOptionHighlightModule} from '@ng-select/ng-option-highlight';
import {EditAdminComponent} from '../userpages/admin-management/management/info-management/edit-admin/edit-admin.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {CountdownModule} from 'ngx-countdown';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LazyLoadImagesModule} from 'ngx-lazy-load-images';
import {TestWebsocketComponent} from './test-websocket/test-websocket.component';
import { ChatModuleComponent } from './chat-module/chat-module.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatSliderModule} from '@angular/material/slider';
@NgModule({
  imports: [
    CommonModule,
    MainpagesRoutingModule,
    SharedModule,
    OpenviduSessionModule,
    UserPagesModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTableFilterModule,
    NgxMaterialTimepickerModule,
    DateTimePickerModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgSelectModule,
    ScheduleModule,
    DatePickerModule,
    SocialLoginModule,
    ShareIconsModule,
    NgOptionHighlightModule,
    OpenviduSessionModule,
    PdfViewerModule,
    CountdownModule,
    MatProgressBarModule,
    MatRadioModule,
    CarouselModule.forRoot(),
    MatProgressSpinnerModule,
    CalendarModule,
    LazyLoadImagesModule,
    MatTreeModule,
    MatSliderModule,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    NgbdSortableHeader,
    TestWebsocketComponent,
    ChatModuleComponent,
  ],
  exports: [
  ],
  entryComponents: [
    EditAdminComponent,
  ],
  providers: []
})
export class MainpagesModule {
}


