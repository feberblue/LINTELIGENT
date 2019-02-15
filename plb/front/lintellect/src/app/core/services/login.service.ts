import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(url, loginPayload): Observable<any> {
    return this.http.post<any>(url, loginPayload);
  };


  getUsers(url): Observable<any> {
    return this.http.get<any>(url);
  }

  getUserById(url, id: number): Observable<any> {
    return this.http.get<any>(url + id);
  }

  createUser(url, user: User): Observable<any> {
    return this.http.post<any>(url, user);
  }

  updateUser(url, user: User): Observable<any> {
    return this.http.put<any>(url + user.id, user);
  }

  deleteUser(url, id: number): Observable<any> {
    return this.http.delete<any>(url + id);
  }
}
