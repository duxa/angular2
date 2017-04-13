// @angular modules
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// third party modules
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Ng2PaginationModule } from 'ng2-pagination';

// app modules
import { UserSessionService } from './user-session.service';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { ENV_PROVIDERS } from './environment';
import { routes } from './app.routes';
import {
  PublicAssociationsData,
  PublicAssociationsService,
  PublicAssociationsComponent,
  PublicAssociationDetailComponent
} from './public-associations';

// common styles
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
    SharedModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    InMemoryWebApiModule.forRoot(PublicAssociationsData, {
      delay: 100
    })
  ],
  providers: [
    PublicAssociationsService,
    UserSessionService,
    ENV_PROVIDERS
  ]
})
export class AppModule { }
