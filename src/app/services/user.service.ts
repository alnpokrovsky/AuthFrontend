import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@entities/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + AuthService.authToken
    });
    return this.http.get<User>('/api/user', {headers});
  }

  updateUser(info: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + AuthService.authToken
    });
    return this.http.put<User>('/api/user', info, {headers});
  }

}
