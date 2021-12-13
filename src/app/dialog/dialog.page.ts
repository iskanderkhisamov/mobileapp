import {Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import * as Centrifuge from 'centrifuge';
import { Subscription } from 'rxjs';
declare var require: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})
export class DialogPage implements OnInit {
  @ViewChild('content') private content: any;
  messages = [];
  user: any;
  myId;
  token: any;
  userId;
  message = '';
  friendName: any;
  friendId: any;
  myName: any;
  subscription: Subscription;
  tokenWebSocket: string;
  urlWebSocket: string;
  channel: string;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) {
    this.getToken();
    this.update();
    this.createChannel();
    this.getChannelData();
  }

  ngOnInit() {
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
    this.sendMessageToChannel();
    console.log('exit sendMessage()');
    this.message = '';
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
    this.storage.getItem('token')
      .then(
        data => {this.token = data; console.log('DATA DATA ДАТА:', data);},
        error => console.error(error)
      );
  }

  async createChannel() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      token: 'db1bc644-cb69-462c-a184-4212962b468c'
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // @ts-ignore
    const response = await fetch('https://iswork.org/api/v1/create-channel/', requestOptions);
    const data = await response.json();
    console.log('Результат:', data);
    this.tokenWebSocket = data.result.token_websocket;
    this.urlWebSocket = data.result.url_websocket;
    this.channel = data.result.channel;
    console.log('tokenWebSocket:', this.tokenWebSocket);
    console.log('urlWebSocket:', this.urlWebSocket);
    console.log('channel:', this.channel);
  }

  async getChannelData() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      token:'db1bc644-cb69-462c-a184-4212962b468c',
      channel:'b69179ad-42c3-4d30-b2d9-6a96e87b6777'
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // @ts-ignore
    const response = await fetch('https://iswork.org/api/v1/get-channel/', requestOptions);
    const data = await response.json();
    console.log('Результат:', data);
    this.tokenWebSocket = data.result.token_websocket;
    this.urlWebSocket = data.result.url_websocket;
    this.channel = data.result.channel;
    console.log('tokenWebSocket:', this.tokenWebSocket);
    console.log('urlWebSocket:', this.urlWebSocket);
    console.log('channel:', this.channel);

    this.connectCent(this.urlWebSocket, this.tokenWebSocket, this.channel);
  }

  async sendMessageToChannel() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      token: 'db1bc644-cb69-462c-a184-4212962b468c',
      channel: this.channel,
      message: {
        text: this.message,
        date: 'dsdsds',
        sdsd: 'gdsgaf'
      }});

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // @ts-ignore
    const response = await fetch('https://iswork.org/api/v1/send-message-channel/', requestOptions);
    const data = await response.json();
    console.log('Результат:', data);
  }

  connectCent(url, token, _channel) {
    const Centrifuge = require('centrifuge');
    const centrifuge = new Centrifuge(url, {
      debug: true
    });
    const channel = 'iswork:'+_channel;
    const subscription = centrifuge.subscribe(channel, (message) => {
      const msg = message.data;
      this.update();
      console.log(msg);
    });
    centrifuge.setToken(token);
    subscription.on('subscribe', () => {
      this.update();
    });
    subscription.on('error', (err) => {
      this.update();
    });
    subscription.on('join', (message) => {
      this.update();
    });
    subscription.on('leave', (message) => {
      this.update();
    });
    centrifuge.connect();
  }
}
