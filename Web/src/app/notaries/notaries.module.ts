import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotariesComponent } from './notaries.component';

export const routes: Routes = [
    { path: '', component: NotariesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    NotariesComponent
  ]
})
export default class NotariesModule {
    public static routes = routes;
}
