import { Routes } from '@angular/router';

import { PublicAssociationsComponent } from './public-associations';
import {
  PublicAssociationDetailComponent
} from './public-associations/public-association-detail.component';

let loadChildrenCallback = (comp: any) => {
  return comp.default;
};

export const routes: Routes = [
  { path: '', component: PublicAssociationsComponent },
  { path: 'new-association', component: PublicAssociationDetailComponent },
  { path: 'association/:id', component: PublicAssociationDetailComponent },
  {
    path: 'judgments',
    loadChildren: () => System.import('./judgments/judgments.module').then(loadChildrenCallback)
  },
  {
    path: 'notaries',
    loadChildren: () => System.import('./notaries/notaries.module').then(loadChildrenCallback)
  },
  {
    path: 'gantt-chart',
    loadChildren: () => System.import('./gantt-chart/gantt-chart.module').then(loadChildrenCallback)
  }
];
