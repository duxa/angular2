import { Component, OnInit } from '@angular/core';

import { PublicAssociationsService } from './public-associations.service';
import { Association } from './association';

@Component({
  selector: 'public-associations',
  styleUrls: [ './public-associations.component.css' ],
  templateUrl: './public-associations.component.html'
})
export class PublicAssociationsComponent implements OnInit {
  public associations: Association[];

  constructor(
    public publicAssociationsService: PublicAssociationsService
  ) {}

  public ngOnInit() {
    this.publicAssociationsService.getData().subscribe((dto) => this.associations = dto);
  }
}
