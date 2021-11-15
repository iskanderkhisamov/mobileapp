import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
  ) {
    this.getToken();
    this.getUser();
    this.refresh();
  }

  ngOnInit() {
    this.getToken();
    this.getUser();
    this.refresh();
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }

  getUser() {
    this.getToken();
    const body = {
      token: this.token
    };
    console.log('НОВЫЙ body с токеном: ', body);
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

  message() {
    this.getToken();
    const body = {
      token: this.token
    };
    return this.http.post('http://studentapi.myknitu.ru/listusers/',
      body,
      {
        responseType: 'json',
        observe: 'response'
      },
    ).subscribe(response => {
      const users = response.body;
      this.storage.setItem('users', users['users'])
        .then(
          () => {
            console.log('Пользователи сохранены');
          },
          error => console.error('Ошибра при сохранении пользователей', error)
        );
      this.router.navigate(['/contact']);
    });
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
