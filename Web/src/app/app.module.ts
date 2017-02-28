import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { PublicAssociationsComponent } from './public-associations';
import { NewAssociationComponent } from './public-associations/new-association.component';

import { PublicAssociationsService } from './public-associations/public-associations.service';

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
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    PublicAssociationsService,
    ENV_PROVIDERS
  ]
})
export class AppModule { }
