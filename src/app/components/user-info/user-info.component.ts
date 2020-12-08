import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  birthdayMinLimit: Date;
  birthdayMaxLimit: Date;

  constructor(
    private userService: UserService
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
    this.userService.getUser().subscribe( (user) => {
      console.log(user);
      this.info.controls.email.setValue(user.username);
      this.info.controls.firstName.setValue(user.firstName);
      this.info.controls.lastName.setValue(user.lastName);
    });
  }

  updateInfo(): void {
    this.userService.updateUser({
      firstName: this.info.controls.firstName.value,
      lastName: this.info.controls.lastName.value,
      username: this.info.controls.email.value,
      password: this.info.controls.password.value
    });
  }

}
