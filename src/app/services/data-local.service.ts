import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Usuario } from '../interfaces/interfaces';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  user: Usuario;
  logeado = false;

  constructor() {
    console.log('<<< DataLocalService >>>');
    this.initUsuario();
  }

  initUsuario() {
    this.user = { codigo: '',
                  nombre: '',
                  rut: '',
                  email: '',
                  modalidad: '',
                  listamodalidad: '',
                  listacliente: '',
                  empresa: '',
                  sucursal: '',
                  bodega: ''};
    // console.log(this.user);
  }

  async guardaUltimoUsuario( rs ) {
    //
    this.user.codigo         = rs.usuario;
    this.user.nombre         = rs.NOKOFU;
    this.user.rut            = rs.RTFU;
    this.user.email          = rs.EMAIL;
    this.user.modalidad      = rs.MODALIDAD;
    this.user.listamodalidad = rs.LISTAMODALIDAD;
    this.user.empresa        = rs.EMPRESA;
    this.user.sucursal       = rs.SUCURSAL;
    this.user.bodega         = rs.BODEGA;
    //
    await Storage.set({
      key: 'krpt_ultimo_usuario',
      value: JSON.stringify( this.user )
    });
  }

  async obtenUltimoUsuario() {
    const { value } = await Storage.get({ key: 'krpt_ultimo_usuario' });
    if ( value === null ) {
      this.initUsuario();
    } else {
      this.user = JSON.parse(value);
    }
    return this.user;
  }

}
