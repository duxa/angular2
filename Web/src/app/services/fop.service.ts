import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PublicAssociation } from '../models';

@Injectable()
export class PublicAssociationsService {
  private publicAssociationsUrl: string = 'api/fops/';

  constructor(private http: Http) {}

  public get(params?: any): Observable<PublicAssociation[]> {
    return this.getData(this.publicAssociationsUrl, params);
  }

  public getById(id: string): Observable<PublicAssociation> {
    return this.getData(this.publicAssociationsUrl + id);
  }

  public update(association: PublicAssociation): Observable<PublicAssociation> {
    return this.http
               .post(this.publicAssociationsUrl, association)
               .map(this.extractData);
  }

  private getData(url: string, params?): Observable<any> {
    return this.http
      .get(url, { search: params })
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    const totalCount = res.headers.get('X-Total-Count');

    let result = (body && body.data) || body;

    if (totalCount) {
      result.TotalCount = totalCount;
    }

    return result;
  }
}
