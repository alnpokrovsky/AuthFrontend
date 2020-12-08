import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  info: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', []),
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
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
