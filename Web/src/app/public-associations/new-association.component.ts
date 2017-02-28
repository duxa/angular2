import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PublicAssociationsService } from './public-associations.service';
import { Association } from './association';

@Component({
  selector: 'new-association',
  templateUrl: './new-association.component.html'
})
export class NewAssociationComponent {
  public newAssociation: Association = new Association();

  constructor(
    private router: Router,
    private publicAssociationsService: PublicAssociationsService
  ) {}

  public addNew() {
    this.publicAssociationsService.addNew(this.newAssociation).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
