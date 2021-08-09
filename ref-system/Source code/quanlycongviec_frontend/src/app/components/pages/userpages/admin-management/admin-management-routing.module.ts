import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { InfoManagementComponent } from './management/info-management/info-management.component';
import { SuperadminComponent } from './management/superadmin/superadmin.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminThuvienComponent } from './admin-thuvien/admin-thuvien.component';
import { ControlNewsComponent } from './admin-news/control-news/control-news.component';
import { EditorNewsComponent } from './admin-news/editor-news/editor-news.component';
import { InfoThuvienComponent } from './admin-thuvien/info-thuvien/info-thuvien.component';
import { AdminNotiComponent } from './admin-noti/admin-noti.component';
import { InfoNotiComponent } from './admin-noti/info-noti/info-noti.component';
import { ImportNotiComponent } from './admin-noti/import-noti/import-noti.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

export const adminroutes: Routes =
  [
    {
      path: 'management', component: ManagementComponent,
      children: [
        {path: 'info', component: InfoManagementComponent},
        {path: 'superadmin', component: SuperadminComponent},
      ],
    },
    {
      path: 'adminnews', component: AdminNewsComponent,
      children: [
        {path: 'control-news', component: ControlNewsComponent},
        {path: 'editor-news', component: EditorNewsComponent},
      ],
    },
    {
      path: 'adminthuvien', component: AdminThuvienComponent,
      children: [
        {path: 'info', component: InfoThuvienComponent},
      ],
    },
    {
      path: 'adminnoti', component: AdminNotiComponent,
      children: [
        {path: 'info', component: InfoNotiComponent},
        {path: 'import', component: ImportNotiComponent}
      ],
    },
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminroutes)
  ],
  exports: [RouterModule],
})
export class AdminManagementRoutingModule { }
