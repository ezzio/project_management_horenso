import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminManagementComponent } from './admin-management.component';
import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { ManagementComponent } from './management/management.component';
import { InfoManagementComponent } from './management/info-management/info-management.component';
import { ResultAdminComponent } from './management/info-management/result-admin/result-admin.component';
import { EditAdminComponent } from './management/info-management/edit-admin/edit-admin.component';
import { SuperadminComponent } from './management/superadmin/superadmin.component';
import { EditSuperadminComponent } from './management/superadmin/edit-superadmin/edit-superadmin.component';
import { ResultSuperadminComponent } from './management/superadmin/result-superadmin/result-superadmin.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { ControlNewsComponent } from './admin-news/control-news/control-news.component';
import { EditorNewsComponent } from './admin-news/editor-news/editor-news.component';
import { AdminThuvienComponent } from './admin-thuvien/admin-thuvien.component';
import { InfoThuvienComponent } from './admin-thuvien/info-thuvien/info-thuvien.component';
import { AdminNotiComponent } from './admin-noti/admin-noti.component';
import { InfoNotiComponent } from './admin-noti/info-noti/info-noti.component';
import { ImportNotiComponent } from './admin-noti/import-noti/import-noti.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AdminManagementComponent,
    ManagementComponent,
    InfoManagementComponent,
    ResultAdminComponent,
    EditAdminComponent,
    SuperadminComponent,
    EditSuperadminComponent,
    ResultSuperadminComponent,
    AdminNewsComponent,
    ControlNewsComponent,
    EditorNewsComponent,
    AdminThuvienComponent,
    InfoThuvienComponent,
    AdminNotiComponent,
    InfoNotiComponent,
    ImportNotiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminManagementRoutingModule,
    SharedModule,
    NgSelectModule,
    MatIconModule,
    QuillModule.forRoot()
  ],
  exports: [
    ResultAdminComponent,
    ResultSuperadminComponent,
  ],
  entryComponents: [
    EditSuperadminComponent,
  ],
})

export class AdminManagementModule { }
