import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTitleDirective } from './directives';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ DocumentTitleDirective ],
  exports: [ DocumentTitleDirective ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
