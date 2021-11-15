import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage {
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  changeProfile(form) {
    this.storage.getItem('token')
      .then(
        data => this.token = data,
        error => console.error(error)
      );
    console.log('changeProfile Form');
    console.log(form.value.name);
    console.log(form.value.surname);
    console.log(form.value.phone);
    console.log(form.value.vk);
    console.log(form.value.skype);
    const body = {
      token: this.token,
      nameuser: form.value.name,
      family: form.value.surname,
      birthday: form.value.birthday,
      phonenumber: form.value.phone,
      vk: form.value.vk,
      skype: form.value.skype
    };
    console.log('body', body);
    return this.http.post('http://studentapi.myknitu.ru/userupdate/',
      body,
      {
        responseType: 'json',
        observe: 'response'
      },
    ).subscribe(response => {
      console.log('Статус изменения профиля', response.status);
      this.router.navigate(['/profile']);
    });
  }
}
