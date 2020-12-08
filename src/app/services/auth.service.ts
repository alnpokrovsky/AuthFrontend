import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@entities/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const AUTH = 'Authorization';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string = sessionStorage.getItem(AUTH) ?? '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  public isLogedIn(): boolean {
    return this.authToken !== '';
  }

  public async login(
    username: string,
    password: string,
    stayLogedIn: boolean = true
  ): Promise<boolean> {
    try {
      const authToken = btoa(username + ':' + password);
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + authToken
      });
      // check that we can login
      await this.http.get<string>('/api/user', {headers}).toPromise();
      this.authToken = authToken;
      if (stayLogedIn) {
        sessionStorage.setItem(AUTH, authToken);
      }
      this.router.navigate(['/user']);
      return true;
    } catch (error) {
      // there'l be error if we cannot login
      this.snackBar.open(error.statusText, 'hide');
      return false;
    }
  }

  public logout(): void {
    this.authToken = '';
    sessionStorage.removeItem(AUTH);
    this.router.navigate(['/auth']);
  }

  public async signup(user: User): Promise<boolean> {
    try {
      await this.http.post<User>('/api/signup', user, httpOptions);
      return this.login(user.username, user.password);
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

  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.authToken
    });
    return this.http.get<User>('/api/user', {headers});
  }

}
