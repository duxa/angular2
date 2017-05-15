import { Injectable } from '@angular/core';

const localeStorageKey = 'locale';

@Injectable()
export class UserSessionService {
  public static getUserLocale() {
    return localStorage.getItem(localeStorageKey) || '';
  }

  public setUserLocale(locale: string) {
    return localStorage.setItem(localeStorageKey, locale);
  }
}
