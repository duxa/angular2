// @angular modules
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// third party modules
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';

// app modules
import { UserSessionService } from './user-session.service';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { ENV_PROVIDERS } from './environment';
import { routes } from './app.routes';
import { MockData } from './mock-data';
import {
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
    NgxPaginationModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    InMemoryWebApiModule.forRoot(MockData, {
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
