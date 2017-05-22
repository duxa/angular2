import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { SharedModule } from '../shared/shared.module';
import { PublicAssociationsService } from '../services';

import { PublicAssociationsData } from '../mock-data/public-associations.data';

import { PublicAssociationsComponent } from '../components/public-associations';
import {
  PublicAssociationDetailComponent
} from '../components/public-associations/public-association-detail';

export const routes: Routes = [
    { path: '', component: PublicAssociationsComponent, pathMatch: 'full' },
    { path: 'new', component: PublicAssociationDetailComponent },
    { path: ':id', component: PublicAssociationDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    InMemoryWebApiModule.forRoot(PublicAssociationsData, {
      delay: 100
    })
  ],
  declarations: [
    PublicAssociationsComponent,
    PublicAssociationDetailComponent
  ],
  providers: [
    PublicAssociationsService
  ]
})
export default class PublicAssociationsModule {
    public static routes = routes;
}
