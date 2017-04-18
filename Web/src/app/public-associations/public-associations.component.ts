import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { PublicAssociationsService } from './public-associations.service';
import { PublicAssociation } from './public-association';

@Component({
  selector: 'public-associations',
  templateUrl: './public-associations.component.html',
  styleUrls: [ './public-associations.component.less' ]
})
export class PublicAssociationsComponent implements OnInit {
  public associations: PublicAssociation[];
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
        return this.getAssociations(1);
      })
      .subscribe((dto) => {
        this.extractData(dto);
        this.currentPage = 1;
      });
  }

  public getPage(page: number) {
    this.getAssociations(page)
        .subscribe((dto) => {
          this.extractData(dto);
          this.currentPage = page;
        });
  }

  public search(term: string) {
    this.searchStream.next(term);
  }

  private extractData(dto) {
      this.associations = dto;
      this.totalCount = dto.TotalCount;
  }

  private getAssociations(page: number) {
    return this.publicAssociationsService.get({
      page,
      itemsPerPage: this.itemsPerPage,
      Name: this.searchTerm
    });
  }
}
