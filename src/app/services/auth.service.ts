import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@entities/user';

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

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<string> {
    const httpOptionsWorkaround = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http.post<string>('/api/login',
      encodeURI(`username=${username}&password=${password}`),
      httpOptionsWorkaround
    );
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/signup',
      user,
      httpOptions
      );
  }

  // getUser(): Observable<User> {
  //   return this.http.get<User>('/api/user', httpOptions);
  // }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>('/api/signup', user, httpOptions);
  // }

}
