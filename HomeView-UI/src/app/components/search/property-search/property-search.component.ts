import { Component, OnInit } from '@angular/core';
import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PropertySearch } from 'src/app/models/property/property-search.model';
import { Property } from 'src/app/models/property/property.model';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css'],
})
export class PropertySearchComponent implements OnInit {
  searchForm: FormGroup;
  properties: Property[] = [];
  propertySearch: PropertySearch;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private propertyservice: PropertyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      location: [undefined],
      propertyType: [undefined],
      keywords: [undefined, [Validators.pattern('^[a-zA-Z ]*$')]],
      minPrice: [1],
      maxPrice: [100000000],
      minBeds: [1],
      maxBeds: [1000],
    });
  }

  isTouched(field: string) {
    return this.searchForm.get(field).touched;
  }
  hasErrors(field: string) {
    return this.searchForm.get(field).errors;
  }
  hasError(field: string, error: string) {
    return !!this.searchForm.get(field).hasError(error);
  }
  minMatchMaxPrice: ValidatorFn = (fg: FormGroup) => {
    const min = parseInt(fg.get('minPrice').value);
    const max = parseInt(fg.get('maxPrice').value);
    return max >= min ? null : { isLarger: true };
  };

  onSubmit() {
    let propertySearch: PropertySearch = new PropertySearch(
      this.searchForm.get('location').value,
      this.searchForm.get('propertyType').value,
      this.searchForm.get('keywords').value,
      parseInt(this.searchForm.get('minPrice').value),
      parseInt(this.searchForm.get('maxPrice').value),
      parseInt(this.searchForm.get('minBeds').value),
      parseInt(this.searchForm.get('maxBeds').value)
    );
    this.propertySearch = propertySearch;
    this.propertyservice.search(propertySearch).subscribe((properties) => {
      this.properties = properties;
      this.toastr.success('Search successful!');
    });
    this.propertySearch = new PropertySearch();
  }
}
