import { Injectable, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

import { UserSessionService } from './index';

function getTranslations(file: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', (evt: any) => {
      resolve(evt.target.response);
    });
    xhr.addEventListener('error', () => reject());

    xhr.open('GET', file);
    xhr.send();
  });
}

@Injectable()
export class I18nService {
  public static getI18nProviders(): Promise<Object[]> {
    // Get the locale id from the global
    const locale = UserSessionService.getUserLocale();

    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];

    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
      return Promise.resolve(noProviders);
    }

    const translationFile = `./assets/locale/messages.${locale}.xlf`;

    return getTranslations(translationFile)
      .then( (translations: string ) => [
        { provide: TRANSLATIONS, useValue: translations },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: locale }
      ])
      .catch(() => noProviders); // ignore if file not found
  }
}
