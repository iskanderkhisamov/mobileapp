import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ActivatedRoute, Router} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPageRoutingModule
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
}
