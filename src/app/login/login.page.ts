import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  login(form) {
    console.log('Логин', form.value.login);
    console.log('Пароль', form.value.password);
    const login = form.value.login;
    const password = form.value.password;
    console.log('Залогинились');
    const body = {
      login,
      password,
    };
    console.log('body:', body.login, ' ', body.password);
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
      this.next();
    });
  }

  next() {
    this.router.navigate(['../tabs'], {relativeTo: this.route});
  }
}
