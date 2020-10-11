import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { MenuComponente } from './interfaces/interfaces';
import { NetworkEngineService } from './services/network-engine.service';
import { DataLocalService } from './services/data-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  menu: Observable<MenuComponente[]>;

  constructor( private platform: Platform,
               private splashScreen: SplashScreen,
               private statusBar: StatusBar,
               public data: DataLocalService,
               private network: NetworkEngineService ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu = this.network.getMenusOpts();
    });
  }
}
