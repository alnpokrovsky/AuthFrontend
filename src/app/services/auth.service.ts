import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@entities/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const AUTH = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static authToken: string = sessionStorage.getItem(AUTH) ?? '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    // need to check cached token
    if (AuthService.authToken !== '') {
      this.checkToken(AuthService.authToken).subscribe(
        ok => {},
        err => this.logout()
      );
    }
   }

  public isLogedIn(): boolean {
    return AuthService.authToken !== '';
  }

  private checkToken(
    token: string
  ): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: 'Basic ' + token
      });
      // check that we can login
      return this.http.get<string>('/api/user', {headers});
  }

  public async login(
    username: string,
    password: string,
    stayLogedIn: boolean = true
  ): Promise<boolean> {
    let authToken = btoa(username + ':' + password);
    console.log(authToken);
    try {
      await this.checkToken(authToken).toPromise();
      AuthService.authToken = authToken;
      if (stayLogedIn) {
        sessionStorage.setItem(AUTH, authToken);
      }
      this.router.navigate(['/user']);
      return true;
    } catch (error) {
      this.snackBar.open(error.statusText, 'hide');
      return false;
    }
  }

  public logout(): void {
    AuthService.authToken = '';
    sessionStorage.removeItem(AUTH);
    this.router.navigate(['/auth']);
  }

  public async signup(user: User): Promise<boolean> {
    try {
      await this.http.post<User>('/api/signup', user).toPromise();
      return await this.login(user.username, user.password);
    } catch (error) {
      // there'l be error if we cannot create user
      if (error.status === 410) {
        this.snackBar.open('User already exists', 'hide');
      } else {
        this.snackBar.open(error.statusText, 'hide');
      }
      return false;
    }
  }

}
