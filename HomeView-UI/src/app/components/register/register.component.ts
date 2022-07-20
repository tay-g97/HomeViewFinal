import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreate } from 'src/app/models/account/user-create.model';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../styles.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstname: [
          null,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        ],
        lastname: [
          null,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        ],
        dateofbirth: [
          null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        addressline1: [
          null,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30),
          ],
        ],
        addressline2: [null, [Validators.maxLength(30)]],
        addressline3: [null, [Validators.maxLength(30)]],
        town: [null, [Validators.maxLength(20)]],
        city: [null, [Validators.maxLength(20)]],
        postcode: [
          null,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10),
            Validators.pattern(
              '^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$'
            ),
          ],
        ],
        accounttype: [
          null,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(6),
          ],
        ],
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
        phone: [null, [Validators.maxLength(15)]],
        marketingemail: [false, []],
        marketingphone: [false, []],
        username: [
          null,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: this.matchValue,
      }
    );
  }

  formHasError(error: string) {
    return !!this.registerForm.hasError(error);
  }

  isTouched(field: string) {
    return this.registerForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.registerForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.registerForm.get(field).hasError(error);
  }

  matchValue: ValidatorFn = (fg: FormGroup) => {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    return password === confirmPassword ? null : { isMatching: true };
  };

  onSubmit() {
    let userCreate: UserCreate = new UserCreate(
      this.registerForm.get('firstname').value,
      this.registerForm.get('lastname').value,
      this.registerForm.get('dateofbirth').value,
      this.registerForm.get('addressline1').value,
      this.registerForm.get('addressline2').value,
      this.registerForm.get('addressline3').value,
      this.registerForm.get('town').value,
      this.registerForm.get('city').value,
      this.registerForm.get('postcode').value,
      this.registerForm.get('accounttype').value,
      this.registerForm.get('email').value,
      this.registerForm.get('phone').value,
      this.registerForm.get('marketingemail').value,
      this.registerForm.get('marketingphone').value,
      this.registerForm.get('username').value,
      this.registerForm.get('password').value
    );

    this.accountService.register(userCreate).subscribe(() => {
      this.router.navigate(['/profile-photo']);
      this.toastr.success('Account created successfully!');
    });
  }
}
