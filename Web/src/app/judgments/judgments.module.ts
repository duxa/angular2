import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared.module';
import { JudgmentsComponent } from './judgments.component';

export const routes: Routes = [
    { path: '', component: JudgmentsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    JudgmentsComponent
  ]
})
export class JudgmentsModule {
    public static routes = routes;
}