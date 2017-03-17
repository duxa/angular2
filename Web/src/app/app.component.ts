import { Component } from '@angular/core';

import { UserSessionService } from './user-session.service';

const supportedLocales = [
  { id: '', name: 'English (en-US)' },
  { id: 'ua', name: 'Українська (ua)' },
  { id: 'ru', name: 'Русский (ru)' }
];

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: [`
    .navbar {
      display: flex;
    }
    .nav {
      width: 100%;
    }
    main {
      padding-top: 51px;
    }
  `]
})
export class AppComponent {
  public userLocale: string;
  public locales = supportedLocales;
  constructor(
    private userSessionService: UserSessionService
  ) {
    this.userLocale = UserSessionService.getUserLocale();
  }

  public setUserLocale(locale: string) {
    this.userSessionService.setUserLocale(locale);
    location.reload();
  }
}
