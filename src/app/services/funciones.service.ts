import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NetworkEngineService } from './network-engine.service';
import { DataLocalService } from './data-local.service';

import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

const { Loading } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  loader: any;
  usuario: any;
  cliente: any;
  config: any;

  decimalPipe: DecimalPipe;

  constructor( public netWork: NetworkEngineService,
               public baseLocal: DataLocalService,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               @Inject(LOCALE_ID) private locale: string
              ) {
    console.log('<<< FuncionesService >>>');
    this.inicializaTodo();
    this.decimalPipe = new DecimalPipe(this.locale);
  }

  textoSaludo() {
    const dia   = new Date();
    if      ( dia.getHours() >= 8  && dia.getHours() < 12 ) { return 'buenos días ';   }
    else if ( dia.getHours() >= 12 && dia.getHours() < 19 ) { return 'buenas tardes '; }
    else                                                    { return 'buenas noches '; }
  }

  hideTabs() {
    let estilo = '';
    const elem   = <HTMLElement>document.querySelector('.tabbar');
    if (elem != null) {
      estilo             = elem.style.display;  // se guarda
      elem.style.display = 'none';              // se anula
    }
    return estilo;
  }

  showTabs( estilo ) {
    const elem = <HTMLElement>document.querySelector('.tabbar');
    if (elem != null) {
      elem.style.display = estilo;
    }
  }

  cargaEspera( milisegundos?) {
    this.loader = Loading.create({
      content: 'Favor esperar...',
      duration: ( milisegundos !== null && milisegundos !== undefined ? milisegundos : 3000 )
      });
    this.loader.present();
  }

  descargaEspera() {
    this.loader.dismiss();
  }

  async msgAlert( titulo, texto ) {
    const alert = await this.alertCtrl.create(
      { cssClass: 'alert-class',
        // header: titulo,
        // subHeader: texto,
        message: texto,
        buttons: ['OK']
      });
    alert.present();
  }

  async muestraySale( cTexto, segundos?, posicion? ) {
    //
    const toast = await this.toastCtrl.create({
      duration: 1000 * segundos,
      message: cTexto,
      position: posicion || 'middle',
      animated: true,
      cssClass: 'toast-class'
    });
    toast.present();
    //
  }

  inicializaTodo() {
    this.usuario = this.baseLocal.initUsuario();
  }

  laHora() {
    const fecha = new Date();
    return 'Hora: ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds() + '.' + fecha.getMilliseconds();
  }

  nombreMes( nMes ) {
    if      ( nMes === 1 ) { return 'Enero'     ; }
    else if ( nMes === 2 ) { return 'Febrero'   ; }
    else if ( nMes === 3 ) { return 'Marzo'     ; }
    else if ( nMes === 4 ) { return 'Abril'     ; }
    else if ( nMes === 5 ) { return 'Mayo'      ; }
    else if ( nMes === 6 ) { return 'Junio'     ; }
    else if ( nMes === 7 ) { return 'Julio'     ; }
    else if ( nMes === 8 ) { return 'Agosto'    ; }
    else if ( nMes === 9 ) { return 'Septiembre'; }
    else if ( nMes === 10) { return 'Octubre'   ; }
    else if ( nMes === 11) { return 'Noviembre' ; }
    else if ( nMes === 12) { return 'Diciembre' ; }
    else                   { return 'n/n'       ; }
  }

  /**
   * Realiza el formato de número de acuerdo a los parámetros indicados.
   * Si un parámetro no va
   * @param numero Dato numérico a formatear. Por defecto cero.
   * @param decimales Número de decimales requerido para el formato. Por defecto cero.
   * @param locale Localización utilizada para el formateo de números. por defecto 'es' (localización para idioma español).
   * @param prefijo (opcional) Texto que se antepone al número a formatear. No incluye espacios separadores.
   * @param sufijo (opcional)  Texto que se pone al final del número a formatear. No incluye espacios separadores.
   */
  formatoNumero(numero: number | 0, decimales: number | 0, locale: string | 'es', prefijo?: string, sufijo?: string): string {
    let result: string = numero.toString(10);
    result  = this.decimalPipe.transform(parseFloat(result), `1.${decimales}-${decimales}`, locale);
    prefijo = (prefijo) ? prefijo : '';
    sufijo  = (sufijo)  ? sufijo  : '';
    return prefijo + `${result}` + sufijo;
  }

}
