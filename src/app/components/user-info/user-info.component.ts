import { Component, OnInit } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, CanDeactivate<UserInfoComponent> {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => console.log(res)
    );
  }

  canDeactivate(): boolean | Observable<boolean> {
    // if(!this.saved){
    return confirm('You will lost unsaved changes!');
    // }
    // else{
    //     return true;
    // }
}

}
