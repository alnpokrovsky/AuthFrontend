import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@entities/user';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

/// name of cach field
export const CACH_AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static authToken: string|null = sessionStorage.getItem(CACH_AUTH);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // need to check cached token
    this.checkToken();
  }

  /**
   * We are loged in if token exists
   */
  public isLogedIn(): boolean {
    return AuthService.authToken != null;
  }

  /**
   * Check that we can login and token isn't corrupted.
   * If we can't then logout
   */
  private checkToken(): void {
    if (AuthService.authToken != null) {
      this.http.get<string>('/api/user').subscribe(
        ok => {},
        err => this.logout()
      );
    }
  }

  /**
   * login: try to get authToken for user/passw.
   * if success then save it
   * @param username
   * @param password
   * @param stayLogedIn if we need to cach out authToken. default true
   */
  public login(
    username: string,
    password: string,
    stayLogedIn: boolean = true
  ): Observable<any> {
    return this.http.post<any>(
      '/api/login', {username, password}
    ).pipe(map( result => {
      console.log(result);
      AuthService.authToken = 'Bearer ' + result.token;
      if (stayLogedIn) {
        sessionStorage.setItem(CACH_AUTH, AuthService.authToken);
      }
      this.router.navigate(['/user']);
      return result;
    }));
  }

  public logout(): void {
    AuthService.authToken = null;
    sessionStorage.removeItem(CACH_AUTH);
    this.router.navigate(['/auth']);
  }

  public signup(user: User): Observable<any> {
    return this.http.post<User>(
      '/api/signup', user
    ).pipe(map( result => {
      this.login(user.username, user.password).subscribe();
      return result;
    }));
  }

}
