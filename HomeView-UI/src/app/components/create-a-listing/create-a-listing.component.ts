import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PropertyCreate } from 'src/app/models/property/property-create.model';
import { Property } from 'src/app/models/property/property.model';
import { AccountService } from 'src/app/services/account.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-create-a-listing',
  templateUrl: './create-a-listing.component.html',
  styleUrls: ['./create-a-listing.component.css'],
})
export class CreateAListingComponent implements OnInit {
  createAListingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    const propertyId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.createAListingForm = this.formBuilder.group({
      propertyId: [propertyId],

      propertyname: [null, [Validators.required, Validators.maxLength(50)]],

      guideprice: [null, [Validators.required]],

      propertytype: [null],

      bathrooms: [null, [Validators.required]],

      bedrooms: [null, [Validators.required]],

      description: [null, [Validators.required, ,]],

      addressline1: [null, [Validators.required]],

      addressline2: [null],

      addressline3: [null],

      town: [null],

      city: [null],

      postcode: [null, [Validators.required]],
    });

    if (!!propertyId || propertyId !== -1) {
      this.propertyService.get(propertyId).subscribe((property) => {
        this.updateForm(property);
      });
    }
  }
  formHasError(error: string) {
    return !!this.createAListingForm.hasError(error);
  }

  isTouched(field: string) {
    return this.createAListingForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.createAListingForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.createAListingForm.get(field).hasError(error);
  }

  isNew() {
    return parseInt(this.createAListingForm.get('propertyId').value) === -1;
  }

  updateForm(property: Property) {
    this.createAListingForm.patchValue({
      propertyId: property.propertyId,
      propertyname: property.propertyname,
      guideprice: property.guideprice,
      propertytype: property.propertytype,
      bathrooms: property.bathrooms,
      bedrooms: property.bedrooms,
      description: property.description,
      addressline1: property.addressline1,
      addressline2: property.addressline2,
      addressline3: property.addressline3,
      town: property.town,
      city: property.city,
      postcode: property.postcode,
    });
  }

  onSubmit() {
    let propertyCreate: PropertyCreate = new PropertyCreate(
      this.createAListingForm.get('propertyId').value,
      this.createAListingForm.get('propertyname').value,
      this.createAListingForm.get('guideprice').value,
      this.createAListingForm.get('propertytype').value,
      this.createAListingForm.get('bathrooms').value,
      this.createAListingForm.get('bedrooms').value,
      this.createAListingForm.get('description').value,
      this.createAListingForm.get('addressline1').value,
      this.createAListingForm.get('addressline2').value,
      this.createAListingForm.get('addressline3').value,
      this.createAListingForm.get('town').value,
      this.createAListingForm.get('city').value,
      this.createAListingForm.get('postcode').value
    );

    this.propertyService.create(propertyCreate).subscribe((createdProperty) => {
      this.updateForm(createdProperty);
      this.toastr.info('Property saved.');
    });
  }
}
