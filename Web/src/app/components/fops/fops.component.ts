
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Fop } from '../../models';
import { FomService  } from '../../services';


@Component({
  selector: 'fops',
  templateUrl: './fops.component.html',
  styleUrls: [ './fops.component.less' ]
})

export class FopsComponent implements OnInit {
  public fops: Observable<Fop[]>;
  public itemsPerPage: number = 10;
  public totalCount: number = 0;
  public currentPage: number;

  private searchStream = new Subject<string>();
  private searchTerm: string;

  constructor(
    private fomService: FomService
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

    this.fops = this.fomService.get({
      page,
      itemsPerPage: this.itemsPerPage,
      Name: this.searchTerm
    });

    this.fops.subscribe((dto) => {
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



