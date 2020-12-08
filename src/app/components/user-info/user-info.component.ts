import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  birthdayMinLimit: Date;
  birthdayMaxLimit: Date;

  constructor(
    private authService: AuthService
  ) {
    // Set the minimum to January 1st 100 years in the past
    const currentYear = new Date().getFullYear();
    this.birthdayMinLimit = new Date(currentYear - 100, 0, 1);
    this.birthdayMaxLimit = new Date(currentYear - 2, 12, 31);
  }

  info: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', []),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    birthday: new FormControl('', []),
  });

  hidePassword = true;

  ngOnInit(): void {
    this.authService.getUser().subscribe( (user) => {
      this.info.controls.email.setValue(user.username);
      this.info.controls.firstName.setValue(user.firstName);
      this.info.controls.lastName.setValue(user.lastName);
    });
  }

  updateInfo(): void {

  }

}
