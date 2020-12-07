import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, AbstractControl} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  hidePassword = true;

  get emailInput(): AbstractControl { return this.signin.controls.email; }
  get passwordInput(): AbstractControl { return this.signin.controls.password; }

  login() {
    if (this.signin.valid) {
      this.authService.login({
        email: this.emailInput.value,
        password: this.passwordInput.value
      }).subscribe(
        res => console.log(res),
        err => this.snackBar.open(err.statusText, 'hide'),
      );
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

}
