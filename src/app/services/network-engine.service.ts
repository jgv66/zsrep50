import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuComponente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NetworkEngineService {

  url = 'https://zsmotorapps.cl/appventas';

  constructor( private http: HttpClient ) {
    console.log('<<< NetworkEngineService >>>');
  }

  getMenusOpts() {
    return this.http.get<MenuComponente[]>( './assets/data/menu-opts.json' );
  }

  obtenRubros() {
    const accion = '/ktp_rubros';
    const url    = this.url + accion;
    const body   = { x: 'ktp_rubros' };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  obtenMarcas() {
    const accion = '/ktp_marcas';
    const url    = this.url + accion;
    const body   = { x: 'ktp_marcas' };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  obtenSuperFamilias() {
    const accion = '/ktp_superfamilias';
    const url    = this.url + accion;
    const body   = { x: 'ktp_superfamilias' };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  obtenFamilias() {
    const accion = '/ktp_familias';
    const url    = this.url + accion;
    const body   = { x: '' };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  soloEnviarCorreo( pCarro, cTo, cCc )  {
    console.log('soloEnviarCorreo()->', pCarro);
    const accion = '/soloEnviarCorreo';
    const url    = this.url + accion;
    const body   = { carro: pCarro, cTo, cCc };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  sendMail( rutocorreo: string ) {
    const accion = '/sendmail';
    const url    = this.url + accion;
    const body   = { rutocorreo };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  traeUnSP( cSP: string, parametros?: any, pUser?: any ) {
    const accion = '/proalma';
    const url    = this.url + accion;
    const body   = { sp: cSP, datos: parametros, user: pUser };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

  traeUnRpt( cSP: string, parametros?: any, pUser?: any ) {
    const accion = '/krpt';
    const url    = this.url + accion;
    const body   = { sp: cSP, datos: parametros, user: pUser };
    return this.http.post( url, body );  // .map( res => res.json() );
  }

}
