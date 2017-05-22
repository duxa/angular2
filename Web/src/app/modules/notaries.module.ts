import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NotariesComponent } from '../components/notaries';

export const routes: Routes = [
    { path: '', component: NotariesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    NotariesComponent
  ]
})
export default class NotariesModule {
    public static routes = routes;
}
