import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@entities/user';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CACH_AUTH } from './auth.interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string|null = sessionStorage.getItem(CACH_AUTH);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // need to check cached token
    if (this.authToken != null) {
      this.checkToken().subscribe(
        ok => {},
        err => this.logout()
      );
    }
   }

  public isLogedIn(): boolean {
    return this.authToken != null;
  }

  private checkToken(): Observable<any> {
      // check that we can login
      return this.http.get<string>('/api/user');
  }

  public login(
    username: string,
    password: string,
    stayLogedIn: boolean = true
  ): Observable<any> {
    return this.http.post<any>(
      '/api/login', {username, password}
    ).pipe(map( result => {
      this.authToken = 'Bearer ' + result.token;
      if (stayLogedIn) {
        sessionStorage.setItem(CACH_AUTH, this.authToken);
      }
      this.router.navigate(['/user']);
      return result;
    }));
  }

  public logout(): void {
    this.authToken = null;
    sessionStorage.removeItem(CACH_AUTH);
    this.router.navigate(['/auth']);
  }

  public signup(user: User): Observable<any> {
    return this.http.post<User>(
      '/api/signup', user
    ).pipe(map( result => {
      return this.login(user.username, user.password);
    }));
  }

}
