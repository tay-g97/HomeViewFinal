import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  updateForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (!this.accountService.isLoggedIn()) {
      this.router.navigate(['/']);
      this.toastr.error('You must be logged in to access this page');
    }
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group(
      {
        Username: [null, [Validators.minLength(1), Validators.maxLength(20)]],
        addressline1: [
          null,
          [Validators.minLength(1), Validators.maxLength(30)],
        ],
        addressline2: [null, [Validators.maxLength(30)]],
        addressline3: [null, [Validators.maxLength(30)]],
        postcode: [
          null,
          [
            Validators.minLength(1),
            Validators.maxLength(10),
            Validators.pattern(
              '^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$'
            ),
          ],
        ],
        phonenumber: [null, [Validators.maxLength(15)]],
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            ),
            Validators.maxLength(30),
          ],
        ],
        oldpass: [null, [Validators.minLength(10), Validators.maxLength(50)]],
        newpass: [null],
      },
      {
        validators: this.matchValue,
      }
    );
  }

  formHasError(error: string) {
    return !!this.updateForm.hasError(error);
  }
  hasErrors(field: string) {
    return this.updateForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.updateForm.get(field).hasError(error);
  }

  isTouched(field: string) {
    return this.updateForm.get(field).touched;
  }
  matchValue: ValidatorFn = (fg: FormGroup) => {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    return password === confirmPassword ? { isMatching: true } : null;
  };
  onSubmit() {
    //do nothing
  }
}
