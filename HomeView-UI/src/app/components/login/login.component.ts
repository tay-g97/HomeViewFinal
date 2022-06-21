import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/account/user-login.model';
import { User } from 'src/app/models/account/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
  '../../../styles.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/'])
      // route to profile here
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]]
    })
  }

  isTouched(field: string){
    return this.loginForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.loginForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.loginForm.get(field).hasError(error);
  }

  onSubmit() {
    let userLogin: UserLogin = new UserLogin(
      this.loginForm.get("username").value,
      this.loginForm.get("password").value
    );

    this.accountService.login(userLogin).subscribe(() => {
      this.router.navigate(['/register']);
      // route to profile here
    });
  }
}
