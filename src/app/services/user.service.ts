import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@entities/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  updateUser(info: User): Observable<User> {
    return this.http.put<User>('/api/user', info);
  }

}
