import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PublicAssociationsService } from './public-associations.service';
import { PublicAssociation } from './public-association';

@Component({
  selector: 'public-association-detail',
  templateUrl: './public-association-detail.component.html'
})
export class PublicAssociationDetailComponent {
  public association: PublicAssociation;
  public associationId: string;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private publicAssociationsService: PublicAssociationsService
  ) {
    this.associationId = activateRoute.snapshot.params['id'];

    if (this.associationId) {
      this.publicAssociationsService.getAssociation(this.associationId).subscribe((dto) => {
        this.association = dto;
      });
    } else {
      this.association = new PublicAssociation();
    }
  }

  public save() {
    if (this.associationId) {
      this.publicAssociationsService.update(this.association).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.publicAssociationsService.add(this.association).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
