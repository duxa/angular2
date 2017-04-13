import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { getTranslationProviders } from './app/i18n-providers';
import { decorateModuleRef } from './app/environment';
import { AppModule } from './app';

export function main(): Promise<any> {
  return getTranslationProviders().then((providers) => {
    const options = { providers };

    platformBrowserDynamic()
      .bootstrapModule(AppModule, options)
      .then(decorateModuleRef)
      .catch((err) => console.error(err));
  });
}

function bootloader(main: any) {
  if (document.readyState === 'complete') {
    main();
  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
}

bootloader(main);
