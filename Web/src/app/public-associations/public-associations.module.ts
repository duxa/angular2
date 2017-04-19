import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { SharedModule } from '../shared.module';
import { PublicAssociationsData } from './public-associations-data';
import {
  PublicAssociationsService,
  PublicAssociationsComponent,
  PublicAssociationDetailComponent
} from './index-inner';

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
export class PublicAssociationsModule {
    public static routes = routes;
}
