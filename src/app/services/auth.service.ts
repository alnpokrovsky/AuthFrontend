import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@entities/user';
import { Login } from '@entities/login';

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

  public login(login: Login): Observable<User> {
    return this.http.post<User>('/api/login', login, httpOptions);
  }

  // getUser(): Observable<User> {
  //   return this.http.get<User>('/api/user', httpOptions);
  // }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>('/api/signup', user, httpOptions);
  // }

}
