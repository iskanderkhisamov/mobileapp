import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {tap} from 'rxjs/operators';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {LoginPage} from '../login/login.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user: any;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
  ) {
  }

  getUser() {
    console.log('Constructor Profile');
    this.storage.getItem('token')
      .then(
        data => this.token = data,
        error => console.error(error)
      );
    const body = {
      token: this.token
    };
    console.log(body);
    return this.http.post('http://studentapi.myknitu.ru/getuser/',
      body,
      {
        responseType: 'json',
        observe: 'response'
      },
    ).subscribe(response => {
        console.log(response.status);
        console.log(response.body);
        this.user = response.body;
    });
  }
}
