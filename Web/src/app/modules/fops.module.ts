import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PublicAssociationsService } from '../services';

import { FopsComponent } from '../components/fops';

export const routes: Routes = [
    { path: '', component: FopsComponent, pathMatch: 'full' },
    { path: 'new', component: FopsComponent },
    { path: ':id', component: FopsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)    
  ],
  declarations: [
    FopsComponent
  ],
  providers: [
    PublicAssociationsService
  ]
})
export default class PublicAssociationsModule {
    public static routes = routes;
}
