import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PublicAssociationsService } from '../../../services';
import { PublicAssociation } from '../../../models';

@Component({
  selector: 'public-association-detail',
  templateUrl: './public-association-detail.component.html',
  styleUrls: [ './public-association-detail.component.less' ]
})
export class PublicAssociationDetailComponent {
  public associationId: string;
  public associationForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private publicAssociationsService: PublicAssociationsService
  ) {
    this.associationId = activateRoute.snapshot.params['id'];

    this.createForm();
    this.getAssociation(this.associationId)
        .subscribe(
          (model: PublicAssociation) => this.setFormValue(model),
          (err) => {
            console.log(err);
            this.router.navigate(['public-associations']);
          }
        );
  }

  // #region Public Methods
  public onSubmit() {
    this.publicAssociationsService.update(this.associationForm.value).subscribe(() => {
      this.router.navigate(['public-associations']);
    });
  }

  public addFounder() {
    (this.associationForm.get('Zasnovn') as FormArray).push(
      this.formBuilder.control('', Validators.required)
    );
  }
  public removeFounder(index: number) {
    (this.associationForm.get('Zasnovn') as FormArray).removeAt(index);
  }

  public addLeader() {
    (this.associationForm.get('Government') as FormArray).push(
      this.formBuilder.control('', Validators.required)
    );
  }
  public removeLeader(index: number) {
    (this.associationForm.get('Government') as FormArray).removeAt(index);
  }
  // #endregion Public Methods

  // #region Private Methods
  private getAssociation(id: string): Observable<PublicAssociation> {
    return id
      ? this.publicAssociationsService.getById(id)
      : Observable.of<PublicAssociation>(new PublicAssociation());
  }

  private setFormValue(value: PublicAssociation) {
    this.associationForm.reset(value);

    if (Array.isArray(value.Zasnovn)) {
      this.associationForm.setControl('Zasnovn', this.formBuilder.array(value.Zasnovn));
    }

    if (Array.isArray(value.Government)) {
      this.associationForm.setControl('Government', this.formBuilder.array(value.Government));
    }
  }

  private createForm() {
    this.associationForm = this.formBuilder.group({
      // readonly fields, available only for existing records
      Id: '',
      RegNum: '',
      DateReg: '',

      // hidden fields required only to support update functionality in "angular-in-memory-web-api"
      id: '',
      itemsPerPage: '',
      page: '',

      Name: ['', Validators.required ],
      VudName: ['', Validators.required ],
      Edrpou: '',
      Adress: ['', Validators.required ],
      Phone: '',
      Zasnovn: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      Government: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ]),
      Kved: '',
      License: ['', Validators.required ]
    });
  }
  // #endregion Private Methods
}
