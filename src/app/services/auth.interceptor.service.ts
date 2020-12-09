import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const CACH_AUTH = 'Authorization';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem(CACH_AUTH);
        if (token != null) {
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
