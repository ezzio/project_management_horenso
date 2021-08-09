import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleComponent} from './schedule/schedule.component';
import {KpiProcessComponent} from './kpi-process/kpi-process.component';
import {ProfileAccountComponent} from './profile-account/profile-account.component';
import {UserpagesComponent} from './userpages.component';
import {AdminManagementComponent} from './admin-management/admin-management.component';

export const UserPageRoutes: Routes = [

  {
    path: 'api', component: UserpagesComponent,
    children: [
      {path: 'profile', component: ProfileAccountComponent,
        loadChildren: () => import('./profile-account/profile-account.module').then(m => m.ProfileAccountModule)},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'kpi', component: KpiProcessComponent,
        loadChildren: () => import('./kpi-process/kpi-process.module').then(m => m.KpiProcessModule)},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(UserPageRoutes)],
  exports: [RouterModule],
})
export class UserpagesRoutingModule {
}
