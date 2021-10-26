import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomePage } from './welcome.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: WelcomePage }]),
    WelcomeRoutingModule,
  ],
  providers: [
    NativeStorage,
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
