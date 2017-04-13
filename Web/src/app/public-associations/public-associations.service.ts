import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PublicAssociation } from './public-association';

interface IAssociationServerResponse {
  Items: PublicAssociation[];
  TotalCount: number;
}

@Injectable()
export class PublicAssociationsService {
  private publicAssociationsUrl: string = 'api/public-associations/';

  constructor(private http: Http) {}

  public get(params?: any): Observable<IAssociationServerResponse> {
    return this.getData(this.publicAssociationsUrl, params);
  }

  public getById(id: string): Observable<PublicAssociation> {
    return this.getData(this.publicAssociationsUrl + id);
  }

  public update(association: PublicAssociation): Observable<PublicAssociation> {
    let method = 'post'; // create new association
    let url = this.publicAssociationsUrl;

    // if association has defined "Id" property
    // it means that it already exist and we should to update it
    if (association.Id) {
      method = 'put';
      url += association.Id;
    }

    return this.http[method](url, association)
               .map(this.extractData);
  }

  private getData(url: string, params?): Observable<any> {
    return this.http
      .get(url, { search: params })
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    let result = body.data || body;
    if (Array.isArray(result) && !('Items' in result && 'TotalCount' in result)) {
      (<any> result).TotalCount = result.length;
      (<any> result).Items = result;
    }
    return result;
  }
}
