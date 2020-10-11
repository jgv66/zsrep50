import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from 'src/app/services/data-local.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { NetworkEngineService } from 'src/app/services/network-engine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  pssw = '';
  buscando = false;

  constructor( private router: Router,
               private network: NetworkEngineService,
               private funciones: FuncionesService,
               public data: DataLocalService ) { }

  ngOnInit() {
    this.data.obtenUltimoUsuario()
        .then( pUsuario => {
          this.email = ( pUsuario ) ? pUsuario.email : '' ;
        })
        .catch( err => {
          this.email = '';
        });
  }

  doLogin() {
    if ( this.email === '' || this.pssw === '' ) {
      this.funciones.msgAlert('DATOS VACIOS', 'Debe indicar: EMail y Clave para ingresar.');
    } else {
      this.buscando = true;
      this.network.traeUnSP(  'ksp_buscarUsuario',
                              { rutocorreo: this.email, clave: this.pssw, empresa: '01', sistema: 'kreport' },
                              { codigo: this.email , nombre: this.email } )
          .subscribe( data => { this.buscando = false; this.revisaDatos( data ); },
                      err  => { this.buscando = false; this.funciones.msgAlert('ATENCION', err ); }
          );
    }
  }

  revisaDatos( data ) {
      try {
        const rs = data.recordset[0];
        // console.log(rs);
        if ( rs.length === 0 ) {
            this.funciones.msgAlert('ATENCION', 'Los datos ingresados no coinciden con usuarios registrados. Corrija o póngase en contacto con su administrador.');
        } else {
            if ( rs.krpt === true ) {
              this.funciones.muestraySale( 'Hola ' + rs.NOKOFU.trim() + ', ' + this.funciones.textoSaludo(), 1.5, 'bottom' );
              //
              this.data.guardaUltimoUsuario( rs );
              //
              this.data.logeado = true;
              this.router.navigate( ['/'] );
            } else {
              this.funciones.msgAlert('ATENCION', 'Ud. no dispone de permisos para acceder a esta aplicación.');
              // console.log('Ud. no dispone de permisos para acceder a esta aplicación.');
            }
        }
      } catch (error) {
        this.funciones.msgAlert('ERROR', error );
        // console.log(error);
      }
  }

}
