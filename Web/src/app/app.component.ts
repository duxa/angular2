import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <nav class="navbar navbar-default navbar-static-top">
      <ul class="nav navbar-nav">
        <li>
          <a [routerLink]="['./']"
             [routerLinkActiveOptions]="{exact: true}"
             routerLinkActive="active">
                Index
          </a>
        </li>
      </ul>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent { }
