import { Routes } from '@angular/router';

import { HomeComponent } from './home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'public-associations',
    loadChildren: './public-associations#PublicAssociationsModule'
  },
  {
    path: 'judgments',
    loadChildren: './judgments#JudgmentsModule'
  },
  {
    path: 'notaries',
    loadChildren: './notaries#NotariesModule'
  },
  // {
    // path: 'gantt-chart',
    // loadChildren: './gantt-chart#GanttChartModule'
  // }
];
