import { Routes } from '@angular/router';

import { PublicAssociationsComponent } from './public-associations';
import {
  PublicAssociationDetailComponent
} from './public-associations/public-association-detail.component';

export const ROUTES: Routes = [
  { path: '', component: PublicAssociationsComponent },
  { path: 'new-association', component: PublicAssociationDetailComponent },
  { path: 'association/:id', component: PublicAssociationDetailComponent }
];
