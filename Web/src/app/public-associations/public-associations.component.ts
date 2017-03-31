import { Component, OnInit } from '@angular/core';

import { PublicAssociationsService } from './public-associations.service';
import { PublicAssociation } from './public-association';

@Component({
  selector: 'public-associations',
  styleUrls: [ './public-associations.component.css' ],
  templateUrl: './public-associations.component.html'
})
export class PublicAssociationsComponent implements OnInit {
  public associations: PublicAssociation[];
  public itemsPerPage: number = 10;
  public currentPage: number;
  public totalCount: number;
  public loading: boolean;

  constructor(
    private publicAssociationsService: PublicAssociationsService
  ) {}

  public ngOnInit() {
    this.getPage(1);
  }

  public getPage(page: number) {
    this.getAssociations(page);
  }

  private getAssociations(page: number) {
    this.loading = true;

    this.publicAssociationsService.getAssociations(page, this.itemsPerPage).subscribe((dto) => {
      this.associations = dto.Items;
      this.totalCount = dto.TotalCount;
      this.currentPage = page;
      this.loading = false;
    });
  }
}
