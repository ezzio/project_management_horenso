import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { UserpagesComponent } from './userpages.component';
import { UserpagesRoutingModule} from './userpages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { QuillModule } from 'ngx-quill';
import { EditNewsComponent } from './admin-management/admin-news/control-news/edit-news/edit-news.component';
import { KpiProcessModule } from './kpi-process/kpi-process.module';
import { ProfileAccountModule } from './profile-account/profile-account.module';
import { AdminManagementModule } from './admin-management/admin-management.module';

@NgModule({
  imports: [
    CommonModule,
    UserpagesRoutingModule,
    SharedModule,
    NgSelectModule,
    NgxSpinnerModule,
    FormsModule,
    MatIconModule,
    ScheduleModule,
    ReactiveFormsModule,
    KpiProcessModule,
    ProfileAccountModule,
    AdminManagementModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    ScheduleComponent,
    EditNewsComponent,
    UserpagesComponent,
  ],
  exports: [
  ],
  entryComponents: [
    EditNewsComponent,
  ],
  providers: []
})
export class UserPagesModule { }
