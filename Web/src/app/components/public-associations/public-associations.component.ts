import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { PublicAssociationsService } from '../../services';
import { PublicAssociation } from '../../models';

@Component({
  selector: 'public-associations',
  templateUrl: './public-associations.component.html',
  styleUrls: [ './public-associations.component.less' ]
})
export class PublicAssociationsComponent implements OnInit {
  public associations: Observable<PublicAssociation[]>;
  public itemsPerPage: number = 10;
  public totalCount: number = 0;
  public currentPage: number;

  private searchStream = new Subject<string>();
  private searchTerm: string;

  constructor(
    private publicAssociationsService: PublicAssociationsService
  ) {}

  public ngOnInit() {
    this.getPage(1);

    this.searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => {
        this.searchTerm = term;
        return this.getPage(1, true);
      }).subscribe();
/*
 * "subscribe" is required because this Observable is cold,
 * which means that the request won't go out until something subscribes to the Observable
 * https://angular.io/docs/ts/latest/guide/server-communication.html#!#no-return-response-object
 */
  }

  public getPage(page: number, createSubject?: boolean) {
    let subject;

    if (createSubject) {
      subject = new Subject();
      this.totalCount = 0;
    }

    this.associations = this.publicAssociationsService.get({
      page,
      itemsPerPage: this.itemsPerPage,
      Name: this.searchTerm
    });

    this.associations.subscribe((dto) => {
      this.totalCount = (dto && (dto as any).TotalCount) || 0;
      this.currentPage = page;

      if (subject) {
        subject.complete();
      }
    });

    return subject;
  }

  public search(term: string) {
    this.searchStream.next(term);
  }
}
