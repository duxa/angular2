import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { Ng2PaginationModule } from 'ng2-pagination';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { PublicAssociationsComponent } from './public-associations';
import { NewAssociationComponent } from './public-associations/new-association.component';

import { PublicAssociationsService } from './public-associations/public-associations.service';
import { UserSessionService } from './user-session.service';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    PublicAssociationsComponent,
    NewAssociationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    PublicAssociationsService,
    UserSessionService,
    ENV_PROVIDERS
  ]
})
export class AppModule { }
