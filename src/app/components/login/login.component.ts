import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get emailInput(): AbstractControl { return this.signin.controls.email; }
  get passwordInput(): AbstractControl { return this.signin.controls.password; }

}
