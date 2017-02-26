import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Index
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent { }
