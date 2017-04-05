import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { PublicAssociation } from './public-association';

interface IAssociationServerResponse {
  Items: PublicAssociation[];
  TotalCount: number;
}

@Injectable()
export class PublicAssociationsService {
  private cachedAssociations: PublicAssociation[];
  constructor(
    private http: Http
  ) {}

  public getAssociations(
    page?: number,
    itemsPerPage?: number
  ): Observable<IAssociationServerResponse> {
    let params: URLSearchParams = new URLSearchParams();

    if (typeof page === 'number') {
      params.set('page', (page).toString());
    }

    if (typeof page === 'number') {
      params.set('itemsPerPage', (itemsPerPage).toString());
    }

    return this.http.get('/assets/mock-data/public-associations.json', { search: params })
               .map((res: Response) => {
                 let result = res.json();
                 this.cachedAssociations = result.Items;
                 return result;
               });
  }

  public getAssociation(id: string): Observable<PublicAssociation> {
    let association = this.cachedAssociations && this.cachedAssociations.find((x) => x.Id === id);
    return association
      ? Observable.of<PublicAssociation>(association)
      : this.http.get('/assets/mock-data/public-association.json?id=' + id)
                 .map((res: Response) => res.json());
  }

  public create(newAssociation: PublicAssociation): Observable<PublicAssociation> {
    // replace the GET method with POST when server-side will be implemented
    return this.http.get('/assets/mock-data/create-association.json', newAssociation)
                    .map((res: Response) => res.json());
  }

  public update(association: PublicAssociation): Observable<PublicAssociation> {
    // replace the GET method with POST when server-side will be implemented
    return this.http.get('/assets/mock-data/update-association.json', association)
                    .map((res: Response) => res.json());
  }
}
