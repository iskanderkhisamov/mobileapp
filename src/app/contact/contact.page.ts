import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  users: any;
  token: any;
  messages = [];
  search: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
  ) {
    console.log('Пытаемся забрать юзеров');
    this.storage.getItem('users')
      .then(
        data => this.users = data,
        error => console.error(error)
      );
    this.getToken();
    console.log('ЗАБРАЛИ ЮЗЕРОВ или нет!!!');
  }

  update() {
    console.log('Обновление юзеров');
    this.storage.getItem('users')
      .then(
        data => this.users = data,
        error => console.error(error)
      );
    console.log('Обновление ЮЗЕРОВ или нет!!!');
  }

  messageToUser(id) {
    console.log('messageToUser(id)');
    this.getToken();
    const body = {
      token: this.token,
      userto: id,
    };
    console.log('body', body);
    this.http.post('http://studentapi.myknitu.ru/getdialog/',
      body,
      {
        responseType: 'json',
        observe: 'response'
      },
    ).subscribe(response => {
      this.messages = response.body["messages"];
      console.log('Сообщения:', this.messages);
      console.log('Выход из messageToUser(id)');
      this.storage.setItem('messages', this.messages)
        .then(
          () => console.log('Сохранили сообщения', this.messages),
          error => console.error('Ошибра при сохранении сообщений', error)
        );
      this.storage.setItem('id', id)
        .then(
          () => console.log('Сохранили id', id),
          error => console.error('Ошибра при сохранении id', error)
        );
      this.router.navigate(['/dialog']);
    });
  }

  searchUsers() {
    this.storage.getItem('users')
      .then(
        data => this.users = [data.find((x: any) => x.family == this.search)],
        error => console.error(error)
      );
    console.log(this.search);
    console.log(this.users);
  }

  getToken() {
    console.log('getToken()');
    this.storage.getItem('token')
      .then(
        data => {this.token = data; console.log('DATA DATA ДАТА:', data);},
        error => console.error(error)
      );
    console.log('token: ', this.token);
  }
}
