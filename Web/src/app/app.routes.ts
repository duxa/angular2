import { Routes } from '@angular/router';

import { PublicAssociationsComponent } from './public-associations';
import { NewAssociationComponent } from './public-associations/new-association.component';

export const ROUTES: Routes = [
  { path: '', component: PublicAssociationsComponent },
  { path: 'add-new', component: NewAssociationComponent }
];
