import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {KpiBoardComponent} from './kpi-task/kpi-board/kpi-board.component';
import {KpiRoadmapComponent} from './kpi-project/kpi-roadmap/kpi-roadmap.component';
import {KpiTimeComponent} from './kpi-time/kpi-time.component';
import {KpiBaocaoComponent} from './kpi-baocao/kpi-baocao.component';
import {AuthGuard} from '../../../../_helpers/auth.guard';
import {KpiGanttmapComponent} from './kpi-project/kpi-ganttmap/kpi-ganttmap.component';
import {KpiProjectComponent} from './kpi-project/kpi-project.component';
import {KpiProjectlistComponent} from './kpi-project/kpi-projectlist/kpi-projectlist.component';
import {KpiTaskComponent} from './kpi-task/kpi-task.component';
import {KpiTasklistComponent} from './kpi-task/kpi-tasklist/kpi-tasklist.component';

export const kpiroutes: Routes =
  [
    {path: 'board', component: KpiBoardComponent, canActivate: [AuthGuard]},
    {path: 'tasklist', component: KpiTasklistComponent},
    {path: 'projectlist', component: KpiProjectlistComponent},
    {path: 'time', component: KpiTimeComponent},
    {path: 'baocao', component: KpiBaocaoComponent}
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(kpiroutes)
  ],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class KpiProcessRoutingModule {
}
