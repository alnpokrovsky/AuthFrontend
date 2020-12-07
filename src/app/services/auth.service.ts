import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
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

  private authToken: string = sessionStorage.getItem('Authorization') ?? '';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<string> {
    this.authToken = btoa(username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.authToken
    });
    return this.http.get<string>('/api/user',
      {headers}
    );
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/signup',
      user,
      httpOptions
    );
  }

  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.authToken
    });
    return this.http.get<User>('/api/user', {headers});
  }

}
