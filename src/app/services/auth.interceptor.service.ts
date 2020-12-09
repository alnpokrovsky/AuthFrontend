import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = AuthService.authToken;
        if (token != null) {
            console.log(token);
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: token
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
