import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Association } from './association';

interface IAssociationServerResponse {
  Items: Association[];
  TotalCount: number;
}

@Injectable()
export class PublicAssociationsService {
  constructor(
    private http: Http
  ) {}

  public getData(page?: number, itemsPerPage?: number): Observable<IAssociationServerResponse> {
    let params: URLSearchParams = new URLSearchParams();

    if (typeof page === 'number') {
      params.set('page', (page).toString());
    }

    if (typeof page === 'number') {
      params.set('itemsPerPage', (itemsPerPage).toString());
    }

    return this.http.get('/assets/mock-data/public-associations.json', { search: params })
               .map((res: Response) => res.json());
  }

  public addNew(newAssociation: Association): Observable<any> {
    return this.http.get('/assets/mock-data/add-new-public-association.json');
  }
}
