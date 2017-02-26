import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Association } from './association';

@Injectable()
export class PublicAssociationsService {
  constructor(
    private http: Http
  ) {}

  public getData(): Promise<Association[]> {
    return this.http.get('/assets/mock-data/public-associations.json').map((res) => res.json());
  }
}
