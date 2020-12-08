import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@entities/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authToken: string = sessionStorage.getItem(AUTH) ?? '';
  public get authToken(): string { return this._authToken; }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // need to check cached token
    if (this.authToken !== '') {
      this.checkToken().subscribe(
        ok => {},
        err => this.logout()
      );
    }
   }

  public isLogedIn(): boolean {
    return this.authToken !== '';
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
      '/api/signin', {username, password}
    ).pipe(map( result => {
      this._authToken = 'Bearer ' + result.token;
      if (stayLogedIn) {
        sessionStorage.setItem(AUTH, this.authToken);
      }
      this.router.navigate(['/user']);
      return result;
    }));
  }

  public logout(): void {
    this._authToken = '';
    sessionStorage.removeItem(AUTH);
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
