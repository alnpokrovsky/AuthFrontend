import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(1) ]),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
  });

  hidePassword = true;
  stayLogedIn = true;

  async login(): Promise<void> {
    if (this.signin.valid) {
      await this.authService.login(
        this.signin.controls.email.value,
        this.signin.controls.password.value,
        this.stayLogedIn
      );
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

  async register(): Promise<void> {
    if (this.signup.valid) {
      await this.authService.signup({
        id: 0,
        username: this.signup.controls.email.value,
        password: this.signup.controls.password.value,
        firstName: this.signup.controls.firstName.value,
        lastName: this.signup.controls.lastName.value
      });
    } else {
      this.snackBar.open('input error', 'hide');
    }
  }

}
