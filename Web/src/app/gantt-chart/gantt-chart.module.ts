import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared.module';
import { GanttChartComponent } from './gantt-chart.component';
import { GanttChartHeaderComponent } from './gantt-chart-header';
import { GanttChartBodyComponent } from './gantt-chart-body';

import { CalendarService } from './services';

export const routes: Routes = [
    { path: '', component: GanttChartComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    GanttChartComponent,
    GanttChartHeaderComponent,
    GanttChartBodyComponent
  ],
  providers: [
    CalendarService
  ]
})
export class GanttChartModule {
  public static routes = routes;
}
