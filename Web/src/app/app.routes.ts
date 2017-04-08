import { Routes } from '@angular/router';

import { PublicAssociationsComponent } from './public-associations';
import {
  PublicAssociationDetailComponent
} from './public-associations/public-association-detail.component';

export const routes: Routes = [
  { path: '', component: PublicAssociationsComponent },
  { path: 'new-association', component: PublicAssociationDetailComponent },
  { path: 'association/:id', component: PublicAssociationDetailComponent },
  {
    // 'judgments' = Єдиний державний реєстр судових рішень
    path: 'judgments',
    loadChildren: () => System.import('./judgments/judgments.module').then((comp: any) => {
      return comp.default;
    })
  },
  {
    // 'notaries' = Єдиний реєстр нотаріусів
    path: 'notaries',
    loadChildren: () => System.import('./notaries/notaries.module').then((comp: any) => {
      return comp.default;
    })
  }
];
