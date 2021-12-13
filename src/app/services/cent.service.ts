import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import * as Centrifuge from 'centrifuge';
import {NativeStorage} from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class CentService {
  centrifuge: any;
  channel: string;
  centSubscription: Subscription;

  constructor(private storage: NativeStorage) {
  }

  connect() {
    this.getToken();
    console.log('Centrifugo connection');
    this.centrifuge = new Centrifuge(environment.centUrl);
    this.centrifuge.setToken(environment.centToken);
    this.centrifuge.connect();
    this.dispatcher();
    this.centrifuge.on('disconnect', (context) => {
      console.log('Disconnect....');
    });
    this.centrifuge.on('connect', (context) => {
      console.log('Connection succesfull.');
    });
  }

  dispatcher(){
    this.centSubscription = this.centrifuge.subscribe(this.channel, (message) => {
      console.log(message);
    });
  }

  disconnect(){
    console.log('Centrifuge disconnection');
    this.centrifuge.disconnect();
  }

  getToken() {
    this.storage.getItem('channel')
      .then(
        data => this.channel = data,
        error => console.error(error)
      );
  }
}
