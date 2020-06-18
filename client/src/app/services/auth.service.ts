import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

const loginUrl = 'http://localhost:8080/auth/login';
const registerDriverUrl = 'http://localhost:8080/auth/signup/driver';
const registerUserUrl = 'http://localhost:8080/auth/signup/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router) {}

  login(user: object) : Observable<any> {
    return this.httpClient
      .post<any>(loginUrl, user)
  }

  registerDriver(driver: object): Observable<any> {
    return this.httpClient
      .post<any>(registerDriverUrl, driver)    
  }

  registerUser(user: object): Observable<any> {
    return this.httpClient
      .post<any>(registerUserUrl, user)    
  }


  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    return localStorage.setItem('token', token);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  setRole(role) {
    return localStorage.setItem('role', role);
  }

  getId() {
    return localStorage.getItem('id');
  }

  setId(id) {
    return localStorage.setItem('id', id);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `ERROR <<code: ${error.status}>> ${error.message}`;
    }
    return throwError(msg);
  }

}


