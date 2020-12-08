import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(
        req: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authService.isLogedIn()) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + AuthService.authToken
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
