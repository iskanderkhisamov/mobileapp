import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Router, ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formUser = {
    login: '',
    password: '',
  };

  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  login(form) {
    console.log(form.value.login);
    console.log(form.value.password);
    const login = form.value.login;
    const password = form.value.password;
    console.log('Залогинились');
    const body = {
      "login": login,
      "password": password,
    };
    console.log(body);
    return this.http.post('http://studentapi.myknitu.ru/auth/',
      body,
      {
        responseType: 'json',
        observe: 'response'
      },
    ).subscribe(response => {
      console.log(response.status);
      console.log(response.body);
      const token = response.body['token'];
      this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Токен сохранён');
            console.log(`Token: ${token}`);
          },
          error => console.error('Ошибра при сохранении токена', error)
        );
      this.token = token;
      this.isLoggedIn = true;
      this.next();
      return token;
    });
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

  next() {
    this.router.navigate(['../tabs'], {relativeTo: this.route});
  }
}
