import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  constructor(
    private http: HttpClient,
  ) { }

  register(form) {
    console.log(form.value.login);
    console.log(form.value.password);
    const login = form.value.login;
    const password = form.value.password;
    console.log('Зарегистрировались');
    const body = {
      "login": login,
      "password": password,
    };
    console.log(body);
    return this.http.post('http://studentapi.myknitu.ru/register/',
      body,
      {
        responseType: 'json',
        observe: 'response'
      },
    ).subscribe(response => {
      console.log(response.status);
    });
  }
}
