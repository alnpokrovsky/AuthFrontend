import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  birthdayMinLimit: Date;
  birthdayMaxLimit: Date;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Set the minimum to January 1st 100 years in the past
    const currentYear = new Date().getFullYear();
    this.birthdayMinLimit = new Date(currentYear - 100, 0, 1);
    this.birthdayMaxLimit = new Date(currentYear - 2, 12, 31);
  }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(1) ]),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    birthday: new FormControl('', []),
  });

  hidePassword = true;
  stayLogedIn = true;

  private showError(status: number) {
    let text = "";
    switch(status) {
      case 401:
        text = "Wrong email/password";
        break;
      case 410:
        text = "User with this email already exists";
        break;
      default:
        text = 'Something went wrong (' + status + ')';
        break;
    }
    this.snackBar.open(text, 'hide')
  }

  login(): void {
    if (this.signin.valid) {
      this.authService.login(
        this.signin.controls.email.value,
        this.signin.controls.password.value,
        this.stayLogedIn
      ).subscribe(
        ok => {},
        err => this.showError(err.status)
      );
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

  register(): void {
    if (this.signup.valid) {
      this.authService.signup({
        username: this.signup.controls.email.value,
        password: this.signup.controls.password.value,
        firstName: this.signup.controls.firstName.value,
        lastName: this.signup.controls.lastName.value,
        birthday: this.signup.controls.birthday.value,
      }).subscribe(
        ok => {},
        err => this.showError(err.status)
      );
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

}
