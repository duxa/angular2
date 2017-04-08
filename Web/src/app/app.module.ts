import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ng2PaginationModule } from 'ng2-pagination';
import { ENV_PROVIDERS } from './environment';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { PublicAssociationsComponent } from './public-associations';
import {
  PublicAssociationDetailComponent
} from './public-associations/public-association-detail.component';

import { PublicAssociationsService } from './public-associations/public-associations.service';
import { UserSessionService } from './user-session.service';

import '../styles/main.less';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    PublicAssociationsComponent,
    PublicAssociationDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2PaginationModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    PublicAssociationsService,
    UserSessionService,
    ENV_PROVIDERS
  ]
})
export class AppModule { }
