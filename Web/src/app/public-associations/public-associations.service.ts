import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PublicAssociation } from './public-association';

interface IAssociationServerResponse {
  Items: PublicAssociation[];
  TotalCount: number;
}

@Injectable()
export class PublicAssociationsService {
  // mock url
  private publicAssociationsUrl: string = '/assets/mock-data/public-associations.json';
  // RESTful api url
  // private publicAssociationsUrl: string = '/public-associations/';

  constructor(private http: Http) {}

  public get(params?: any): Observable<IAssociationServerResponse> {
    return this.getData(this.publicAssociationsUrl, params);
  }

  public getById(id: string): Observable<PublicAssociation> {
    // RESTful
    // return this.getData(this.publicAssociationsUrl + id);

    // mock
    return this.http
      .get(this.publicAssociationsUrl)
      .map((res: Response) => this.extractData(res).Items.find((x) => x.Id === id));
  }

  public update(association: PublicAssociation): Observable<PublicAssociation> {
    const method = association.Id
      ? 'put' // update existing association
      : 'post'; // create new association
    return this.http[method](this.publicAssociationsUrl, association)
               .map(this.extractData);
  }

  private getData(url: string, params?): Observable<any> {
    return this.http
      .get(url, { search: params })
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || body;
  }
}
