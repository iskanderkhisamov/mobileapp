import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})
export class DialogPage implements OnInit {
  messages = [];
  user: any;
  myId;
  token: any;
  userId;
  message = '';
  friendName: any;
  friendId: any;
  myName: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private zone: NgZone,
  ) {
    this.getToken();
    this.update();
  }

  ngOnInit() {
    this.getToken();
    this.update();
  }

  getUserById(id) {
    this.getToken();
    const url = 'http://studentapi.myknitu.ru/getdialog/';
    const body = {token: this.token, userid: id};
    this.http.post(url, body, {
      responseType: 'json',
      observe: 'response'
    },).subscribe(response => {
      this.user = response.body;
    });
  }

  sendMessage() {
    console.log('sendMessage()');
    this.getToken();
    const url = 'http://studentapi.myknitu.ru/sendmessage/';
    const body = {token: this.token, userto: this.userId, message: this.message};
    console.log(body);
    this.http.post(url, body, {
      responseType: 'json',
      observe: 'response'
    },).subscribe(response => {
      console.log('response.status', response['status']);
    });
    this.update();
    console.log('exit sendMessage()');
  }

  update() {
    console.log('update()');
    this.getToken();
    this.storage.getItem('id').then(
      data => {this.userId = data; console.log('this.userId ДАТА:', data);},
      error => console.error(error)
    );
    this.storage.getItem('messages').then(
      data => {this.messages = data; console.log('this.messages ДАТА:', data);},
      error => console.error(error)
    );
    const url = 'http://studentapi.myknitu.ru/getdialog/';
    const body = {token: this.token, userto: this.userId};
    this.http.post(url, body, {
      responseType: 'json',
      observe: 'response'
    },).subscribe(response => {
      this.messages = response.body['messages'];
    });
    this.getNames();
    this.refresh();
    console.log('exit update()');
  }

  getNames() {
    this.getToken();
    let url = 'http://studentapi.myknitu.ru/getuserwithid/';
    const body = {token: this.token, userid: this.userId};
    this.http.post(url, body, {
      responseType: 'json',
      observe: 'response'
    },).subscribe(response => {
      this.friendName = response.body['family'];
      this.friendId = response.body['id_user'];
    });

    this.getToken();
    url = 'http://studentapi.myknitu.ru/getuser/';
    const newBody = {token: this.token};
    this.http.post(url, newBody, {
      responseType: 'json',
      observe: 'response'
    },).subscribe(response => {
      this.myName = response.body['family'];
      this.myId = response.body['id_user'];
    });
  }

  getToken() {
    console.log('getToken() в dialog');
    this.storage.getItem('token')
      .then(
        data => {this.token = data; console.log('DATA DATA ДАТА:', data);},
        error => console.error(error)
      );
    console.log('token в dialog: ', this.token);
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen dialog');
    });
  }
}
