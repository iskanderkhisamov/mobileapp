import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {tap} from 'rxjs/operators';
import {User} from '../models/user';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss']
})
export class WelcomePage {

}
