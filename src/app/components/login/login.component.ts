import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, AbstractControl} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NONE_TYPE } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
  });

  hidePassword = true;

  get emailInput(): AbstractControl { return this.signin.controls.email; }
  get passwordInput(): AbstractControl { return this.signin.controls.password; }

  login() {
    if (this.signin.valid) {
      this.authService.login(
        this.emailInput.value,
        this.passwordInput.value
      ).subscribe(
        ok => {console.log(ok); this.router.navigate(['/user']); },
        err => this.snackBar.open(err.statusText, 'hide'),
      );
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

  register() {
    if (this.signup.valid) {
      this.authService.signup({
        id: 0,
        username: this.signup.controls.email.value,
        password: this.signup.controls.password.value,
        firstName: this.signup.controls.firstName.value,
        lastName: this.signup.controls.lastName.value
      }).subscribe(
        res => console.log(res),
        err => err.status === 410
          ? this.snackBar.open('Already exists', 'hide')
          : this.snackBar.open(err.statusText, 'hide'),
      );
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

}
