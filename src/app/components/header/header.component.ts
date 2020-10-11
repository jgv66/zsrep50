import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataLocalService } from 'src/app/services/data-local.service';
import { NetworkEngineService } from 'src/app/services/network-engine.service';
import { MenuComponente } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  menu: Observable<MenuComponente[]>;

  constructor( private menuCtrl: MenuController,
               private network: NetworkEngineService,
               private router: Router,
               public data: DataLocalService ) {}

  ngOnInit() {
    this.menu = this.network.getMenusOpts();
  }

  mostrarMenu() {
    this.menuCtrl.open('first');
  }

}
