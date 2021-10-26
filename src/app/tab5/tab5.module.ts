import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

import { Tab5PageRoutingModule } from './tab5-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }]),
    Tab5PageRoutingModule,
  ],
  providers: [
    NativeStorage,
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
