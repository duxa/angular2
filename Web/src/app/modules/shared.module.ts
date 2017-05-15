// @angular modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpModule, XHRBackend, Http, RequestOptions,
} from '@angular/http';

// third-party modules
import { NgxPaginationModule } from 'ngx-pagination';

import { DocumentTitleDirective } from '../directives';
import { CustomHttp } from '../custom-http';

@NgModule({
  declarations: [ DocumentTitleDirective ],
  exports: [
    HttpModule,
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    DocumentTitleDirective
  ],
  providers: [
    {
      provide: Http,
      deps: [ XHRBackend, RequestOptions ],
      useClass: CustomHttp // "CustomHttp" it's a global Http error handler
    }
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
