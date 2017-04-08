import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { JudgmentsComponent } from './judgments.component';

export const routes: Routes = [
    { path: '', component: JudgmentsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    JudgmentsComponent
  ]
})
export default class JudgmentsModule {
    public static routes = routes;
}
