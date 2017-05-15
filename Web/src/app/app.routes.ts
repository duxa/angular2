import { Routes } from '@angular/router';

import { HomeComponent } from './components/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'public-associations',
    loadChildren: './modules/public-associations.module'
  },
  {
    path: 'judgments',
    loadChildren: './modules/judgments.module'
  },
  {
    path: 'notaries',
    loadChildren: './modules/notaries.module'
  },
  // {
    // path: 'gantt-chart',
    // loadChildren: './modules/gantt-chart.module'
  // }
];
