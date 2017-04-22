import { Injectable } from '@angular/core';
import {
  Http, ConnectionBackend, RequestOptions,
  Request, RequestOptionsArgs, Response
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(this.catchErrors);
  }

  private catchErrors(res: Response) {
    switch (res.status) {
      case 401:
      case 403:
        // handle authorization errors
        break;
      case 404:
        // handle "Not Found" error
        break;
      default:
        // handle other HTTP errors
    }

    return Observable.throw(res);
  }
}
