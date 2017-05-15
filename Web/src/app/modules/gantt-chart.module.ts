import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared.module';

import {
  GanttChartComponent,
  GanttChartBodyComponent,
  GanttChartHeaderComponent
} from '../components/gantt-chart';

import { CalendarService } from '../services';

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
export default class GanttChartModule {
  public static routes = routes;
}
