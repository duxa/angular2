import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { decorateModuleRef } from './app/environment';
import { I18nService } from './app/services';

import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

export function main(): Promise<any> {
  return I18nService.getI18nProviders().then((providers) => {
    const options = { providers };

    platformBrowser()
      .bootstrapModuleFactory(AppModuleNgFactory)
      .then(decorateModuleRef)
      .catch((err) => console.error(err));
  });
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
