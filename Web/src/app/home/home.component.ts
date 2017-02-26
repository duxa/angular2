import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PublicAssociationsService } from './public-associations.service';
import { Association } from './association';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  providers: [ PublicAssociationsService ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public associations: Association[];

  constructor(
    public publicAssociationsService: PublicAssociationsService
  ) {}

  public ngOnInit() {
    this.publicAssociationsService.getData().subscribe((dto) => this.associations = dto);
  }
}
