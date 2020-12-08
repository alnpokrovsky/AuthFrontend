import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    isLoginAwailable(): boolean {
        if (!this.authService.isLogedIn()) {
            return true;
        } else {
            console.log('here');
            this.router.navigate(['/']);
            return false;
        }
    }

    isOtherAwailable(): boolean {
        if (this.authService.isLogedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        console.log(next.url);
        if (next.url.length > 0) {
            if (next.url[0].path === 'auth') {
                return this.isLoginAwailable();
            } else {
                return this.isOtherAwailable();
            }
        } else {
            return true;
        }
    }
}
