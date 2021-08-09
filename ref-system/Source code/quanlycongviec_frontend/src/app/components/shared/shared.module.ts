import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './calendar/calendar.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {DatetimeComponent} from './datetime/datetime.component';
import {ImportDataComponent} from './import-data/import-data.component';
import {ChildLayoutComponent} from './layouts/child-layout/child-layout.component';
import {FormTemplateComponent} from './layouts/form-template/form-template.component';
import {ImportOrReadComponent} from './layouts/import-or-read/import-or-read.component';
import {NavigationComponent} from './layouts/navigation/navigation.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {TableTemplateComponent} from './layouts/table-template/table-template.component';
import {SelectEmpComponent} from './select-emp/select-emp.component';
import {SelectRegionComponent} from './select-region/select-region.component';
import {SelectTimeComponent} from './select-time/select-time.component';
import {SingleCalendarComponent} from './singlecalendar/singlecalendar.component';
import {ConfirmationDialogService} from './confirmation-dialog/confirmation-dialog.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import {RouterModule} from '@angular/router';
import {DatePipe} from '@angular/common';
import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdownAnchor,
  NgbPopoverModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import {FormatDatepicker} from '../../_helpers/format-datepicker';
import {DatePickerAllModule, DatePickerModule, DateTimePickerModule, TimePickerModule} from '@syncfusion/ej2-angular-calendars';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {ConfirmTemplateComponent} from './layouts/confirm-template/confirm-template.component';
import {SelectDepartComponent} from './select-depart/select-depart.component';
import {ChartsComponent} from './charts/charts.component';
import {ChartAllModule} from '@syncfusion/ej2-angular-charts';
import {ChartsModule} from 'ng2-charts';
import 'chartjs-plugin-labels';
import {MapComponent} from './map/map.component';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService, TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import {
  MapModule,
} from 'angular-maps';
import {MapsAllModule} from '@syncfusion/ej2-angular-maps';
import {BingmapComponent} from './bingmap/bingmap.component';
import {NavigationNewsComponent} from './layouts/navigation-news/navigation-news.component';
import {RichtextTemplateComponent} from './layouts/richtext-template/richtext-template.component';
import {QuillModule} from 'ngx-quill';
import {NavigationGuestComponent} from './layouts/navigation-guest/navigation-guest.component';
import {DetailNewsComponent} from './detail-news/detail-news.component';
import {SafeUrlPipe} from 'src/app/_pipe/blob.pipe';
import {NewsListComponent} from './news-list/news-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableFilterModule} from 'mat-table-filter';
import {MatTableTemplateComponent} from './layouts/mat-table-template/mat-table-template.component';
import {TableFormTemplateComponent} from './layouts/table-form-template/table-form-template.component';
import {CLOUDINARY_CONFIG, NgxPictureModule} from 'ngx-picture';
import {LazyImgDirective} from '../../_directives/lazyimg.directive';
import {DirectiveModule} from '../../_directives/directive.module';
import {CheckboxComponent} from './checkbox-template/checkbox.component';
import {CheckboxGroupComponent} from './checkboxgroup/checkbox-group.component';
import {ComboBoxAllModule} from '@syncfusion/ej2-angular-dropdowns';
import {FormTableTemplateComponent} from './layouts/form-table-template/form-table-template.component';
import {TypesFormTemplateComponent} from './layouts/types-form-template/types-form-template.component';
import {SingleDatetimeComponent} from './single-datetime/single-datetime.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DateTimePickerComponent} from './single-datetime/date-time-picker/date-time-picker.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {MatBadgeModule} from '@angular/material/badge';
import {NotiTemplateComponent} from './layouts/noti-template/noti-template.component';
import {TableTwocolsTemplateComponent} from './layouts/table-twocols-template/table-twocols-template.component';
import {ReadmoreComponent} from './readmore/readmore.component';
import {SpinnerLayoutComponent} from './spinner-layout/spinner-layout.component';
import {SnowLayoutComponent} from './layouts/decoration/snow-layout/snow-layout.component';
import {Snow2LayoutComponent} from './layouts/decoration/snow2-layout/snow2-layout.component';
import {SafePipe} from '../../_pipe/safe.pipe';
import {SelectTemplateComponent} from './select-template/select-template.component';
import {VideostreamComponent} from './videostream/videostream.component';
import { SideBodyLayoutComponent } from './layouts/side-body-layout/side-body-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BoxElementComponent } from './layouts/box-element/box-element.component';
import {MatSliderModule} from '@angular/material/slider';
import { MultipleInputTemplateComponent } from './multiple-input-template/multiple-input-template.component';
import { DoublecalendarComponent } from './doublecalendar/doublecalendar.component';
import { SelectDepartEmailComponent } from './select-depart-email/select-depart-email.component';
import {MatTreeModule} from '@angular/material/tree';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterModule,
    FormsModule,
    NgbDatepickerModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    NgbDropdownModule,
    MatIconModule,
    MatRippleModule,
    MatBadgeModule,
    DateTimePickerModule,
    DatePickerAllModule,
    ReactiveFormsModule,
    ChartAllModule,
    ChartsModule,
    MapModule.forRoot(),
    MapsAllModule,
    QuillModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableFilterModule,
    NgxPictureModule.forRoot(CLOUDINARY_CONFIG),
    DirectiveModule,
    ComboBoxAllModule,
    NgbPopoverModule,
    TimePickerModule,
    NgbTimepickerModule,
    ClickOutsideModule,
    MatSidenavModule,
    MatSliderModule,
    MatTreeModule,
  ],
  declarations: [
    CalendarComponent,
    ConfirmationDialogComponent,
    DatetimeComponent,
    ImportDataComponent,
    ChildLayoutComponent,
    FormTemplateComponent,
    ImportOrReadComponent,
    NavigationComponent,
    SidebarComponent,
    TableTemplateComponent,
    SelectEmpComponent,
    SelectRegionComponent,
    SelectTimeComponent,
    SingleCalendarComponent,
    ConfirmTemplateComponent,
    SelectDepartComponent,
    ChartsComponent,
    MapComponent,
    BingmapComponent,
    NavigationNewsComponent,
    RichtextTemplateComponent,
    NavigationGuestComponent,
    DetailNewsComponent,
    SafeUrlPipe,
    NewsListComponent,
    MatTableTemplateComponent,
    TableFormTemplateComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    FormTableTemplateComponent,
    TypesFormTemplateComponent,
    SingleDatetimeComponent,
    DateTimePickerComponent,
    NotiTemplateComponent,
    TableTwocolsTemplateComponent,
    ReadmoreComponent,
    SpinnerLayoutComponent,
    SnowLayoutComponent,
    Snow2LayoutComponent,
    SafePipe,
    SelectTemplateComponent,
    VideostreamComponent,
    SideBodyLayoutComponent,
    BoxElementComponent,
    MultipleInputTemplateComponent,
    DoublecalendarComponent,
    SelectDepartEmailComponent,
  ],
  providers: [
    ConfirmationDialogService, DatePipe,
    {provide: NgbDateParserFormatter, useClass: FormatDatepicker},
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService,
  ],

  exports: [
    CalendarComponent,
    SingleCalendarComponent,
    TableTemplateComponent,
    ChildLayoutComponent,
    NavigationComponent,
    ImportOrReadComponent,
    FormTemplateComponent,
    SelectRegionComponent,
    SelectEmpComponent,
    ImportDataComponent,
    SelectDepartComponent,
    ChartsComponent,
    MapComponent,
    BingmapComponent,
    NavigationNewsComponent,
    RichtextTemplateComponent,
    NavigationGuestComponent,
    DetailNewsComponent,
    SafeUrlPipe,
    NewsListComponent,
    MatTableTemplateComponent,
    TableFormTemplateComponent,
    CheckboxGroupComponent,
    CheckboxComponent,
    FormTableTemplateComponent,
    TableTwocolsTemplateComponent,
    SpinnerLayoutComponent,
    SnowLayoutComponent,
    Snow2LayoutComponent,
    SafePipe,
    SelectTemplateComponent,
    VideostreamComponent,
    SideBodyLayoutComponent,
    BoxElementComponent,
    SingleDatetimeComponent,
    SelectDepartEmailComponent,
  ],
  bootstrap: [],
  entryComponents: [ConfirmationDialogComponent],

})
export class SharedModule {
}
