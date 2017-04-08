import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserSessionService } from './user-session.service';

const supportedLocales = [
  { id: '', name: 'English (en-US)' },
  { id: 'ua', name: 'Українська (ua)' },
  { id: 'ru', name: 'Русский (ru)' }
];

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public userLocale: FormControl = new FormControl();
  public locales = supportedLocales;
  constructor(
    private userSessionService: UserSessionService
  ) {
    this.userLocale.setValue(UserSessionService.getUserLocale());
    this.userLocale.valueChanges.forEach(
      (value: string) => this.setUserLocale(value)
    );
  }

  public setUserLocale(locale: string) {
    this.userSessionService.setUserLocale(locale);
    location.reload();
  }
}
