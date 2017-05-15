import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { I18nService } from './app/services';
import { decorateModuleRef } from './app/environment';
import { AppModule } from './app';

export function main(): Promise<any> {
  return I18nService.getI18nProviders().then((providers) => {
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
