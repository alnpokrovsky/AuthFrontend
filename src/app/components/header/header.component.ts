import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  get title(): string {
    return this.router.url.substring(1);
  }

  get isLogedIn(): boolean {
    return this.authService.isLogedIn();
  }

  logout(): void {
    this.authService.logout();
  }


}
