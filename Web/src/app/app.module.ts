// @angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// app modules
import { UserSessionService } from './user-session.service';
import { SharedModule } from './shared.module';
import { ENV_PROVIDERS } from './environment';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';

// common styles
import '../styles/main.less';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    UserSessionService,
    ENV_PROVIDERS
  ]
})
export class AppModule { }
