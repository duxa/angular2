import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { PublicAssociationsService } from './public-associations.service';
import { PublicAssociation } from './public-association';

@Component({
  selector: 'public-associations',
  templateUrl: './public-associations.component.html',
  styleUrls: [ './public-associations.component.css' ]
})
export class PublicAssociationsComponent implements OnInit {
  public associations: PublicAssociation[];
  public itemsPerPage: number = 10;
  public currentPage: number;
  public totalCount: number;
  public loading: boolean;

  private searchAssociationsStream = new Subject<string>();

  constructor(
    private publicAssociationsService: PublicAssociationsService
  ) {}

  public ngOnInit() {
    this.getPage(1);

    this.searchAssociationsStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.getAssociations(1, term))
      .subscribe(); // subscribe is required because this Observable is "cold"
  }

  public getPage(page: number) {
    this.getAssociations(page);
  }

  private search(term: string) {
    this.searchAssociationsStream.next(term);
  }

  private getAssociations(page: number, search?: string) {
    this.loading = true;

    const itemsPerPage = this.itemsPerPage;
    const request = this.publicAssociationsService.get({page, itemsPerPage, search});

    request.subscribe((dto) => {
      this.associations = dto.Items;
      this.totalCount = dto.TotalCount;
      this.currentPage = page;
      this.loading = false;
    });

    return request;
  }
}
