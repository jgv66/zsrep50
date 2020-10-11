import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataLocalService } from 'src/app/services/data-local.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { NetworkEngineService } from 'src/app/services/network-engine.service';
import { MenuComponente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  menu: Observable<MenuComponente[]>;

  constructor( private menuCtrl: MenuController,
               private network: NetworkEngineService,
               private funciones: FuncionesService,
               private router: Router,
               private data: DataLocalService ) {}

  ngOnInit() {
    this.menu = this.network.getMenusOpts();
  }

  entrar() {
    if ( this.data.logeado ) {
      this.funciones.muestraySale( 'Ya esta logeado. El menú esta en la esquina superior izquierda.', 2 );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
