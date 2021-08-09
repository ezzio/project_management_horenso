import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KpiProcessRoutingModule} from './kpi-process-routing.module';
import {KpiBoardComponent} from './kpi-task/kpi-board/kpi-board.component';
import {KpiDialogComponent} from './kpi-task/kpi-board/kpi-board-action/kpi-dialog/kpi-dialog.component';
import {KpiMapComponent} from './kpi-map/kpi-map.component';
import {KpiRoadmapComponent} from './kpi-project/kpi-roadmap/kpi-roadmap.component';
import {KpiTimeComponent} from './kpi-time/kpi-time.component';
import {KpiBaocaoComponent} from './kpi-baocao/kpi-baocao.component';
import {PointTaskComponent} from './kpi-task/kpi-board/kpi-board-action/point-task/point-task.component';
import {GanttChartComponent} from './shared/gantt-chart/gantt-chart.component';
import {KpiProjectComponent} from './kpi-project/kpi-project.component';
import {KpiProjectlistComponent} from './kpi-project/kpi-projectlist/kpi-projectlist.component';
import {KpiSearchProjectComponent} from './shared/kpi-search-project/kpi-search-project.component';
import {KpiBoardFilterComponent} from './shared/kpi-board-filter/kpi-board-filter.component';
import {KpiBoardObsComponent} from './shared/kpi-board-obs/kpi-board-obs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {KpiProcessComponent} from './kpi-process.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {MatTreeModule} from '@angular/material/tree';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {CreateProjectComponent} from './kpi-task/kpi-board/create-project/create-project.component';
import {CreateLargeProjectComponent} from './kpi-task/kpi-board/create-project/create-large-project/create-large-project.component';
import {FormCreateComponent} from './shared/form-create/form-create.component';
import {TimePickerModule} from '@syncfusion/ej2-angular-calendars';
import {MatSliderModule} from '@angular/material/slider';
import {TimerKpiComponent} from './kpi-task/kpi-board/timer-kpi/timer-kpi.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {KpiTasklistComponent} from './kpi-task/kpi-tasklist/kpi-tasklist.component';
import {KpiTaskComponent} from './kpi-task/kpi-task.component';
import {UpdateOwnerListComponent} from './kpi-task/kpi-tasklist/update-owner-list/update-owner-list.component';
import {KpiReportComponent} from './kpi-task/kpi-board/kpi-board-action/kpi-dialog/kpi-report/kpi-report.component';
import {KpiCommentComponent} from './shared/kpi-comment/kpi-comment.component';
import {KpiSummaryComponent} from './kpi-summary/kpi-summary.component';
import {CreateFreeTaskComponent} from './kpi-task/kpi-board/kpi-board-action/create-free-task/create-free-task.component';
import {KpiGanttmapComponent} from './kpi-project/kpi-ganttmap/kpi-ganttmap.component';
import {ChartModule} from 'angular2-chartjs';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ChartsModule} from 'ng2-charts';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    KpiProcessComponent,
    KpiBoardComponent,
    KpiDialogComponent,
    KpiMapComponent,
    KpiRoadmapComponent,
    KpiTimeComponent,
    CreateProjectComponent,
    CreateLargeProjectComponent,
    FormCreateComponent,
    TimerKpiComponent,
    KpiTasklistComponent,
    KpiTaskComponent,
    UpdateOwnerListComponent,
    PointTaskComponent,
    KpiReportComponent,
    KpiCommentComponent,
    KpiSummaryComponent,
    KpiBaocaoComponent,
    CreateFreeTaskComponent,
    KpiGanttmapComponent,
    KpiBoardObsComponent,
    GanttChartComponent,
    KpiProjectComponent,
    KpiProjectlistComponent,
    KpiSearchProjectComponent,
    KpiBoardFilterComponent
  ],
  imports: [
    CommonModule,
    KpiProcessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    DragDropModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    NgxGraphModule,
    MatTreeModule,
    NgbPopoverModule,
    NgSelectModule,
    SharedModule,
    TimePickerModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    ChartsModule,
    ChartModule,
    ScrollToModule,
    MatTooltipModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    KpiBoardComponent,
    KpiDialogComponent,
    CreateProjectComponent,
    CreateLargeProjectComponent,
    UpdateOwnerListComponent,
    PointTaskComponent,
    KpiReportComponent,
    CreateFreeTaskComponent,
  ],
})
export class KpiProcessModule {
}
