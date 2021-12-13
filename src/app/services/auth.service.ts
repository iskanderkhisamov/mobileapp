import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint = 'http://studentapi.myknitu.ru';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/register/`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/auth/`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['../tabs'], {relativeTo: this.route});
        });
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    const api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => res || {}),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
