import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { NetworkEngineService } from '../../services/network-engine.service';
import { DataLocalService } from '../../services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas013',
  templateUrl: './ventas013.page.html',
  styleUrls: ['./ventas013.page.scss'],
})
export class Ventas013Page implements OnInit {

  codSucursal = '';
  sucursales = [];
  annomes = '';
  periodos = [];
  buscando = false;

  constructor( private funciones: FuncionesService,
               private network: NetworkEngineService,
               public data: DataLocalService ) {}

  ngOnInit() {
    this.traeSucursales();
    this.traePeriodos();
  }

  traeSucursales() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte: 20,
                                              empresa: this.data.user.empresa },    // ventas sucursal, vendedor, mes actual
                                            { codigo:  this.data.user.codigo,
                                              nombre:  this.data.user.nombre } )
        .subscribe( data => { this.revisaDatosSucursal( data ); },
                    err  => { this.funciones.msgAlert( 'ATENCION', err ); }
                  );
  }
  revisaDatosSucursal( data ) {
    const rs = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : No existen sucursales para representar', 2 );
    } else {
      this.sucursales = rs;
    }
  }

  traePeriodos() {
      this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte: 11,
                                                empresa: this.data.user.empresa },    // ventas sucursal, vendedor, mes actual
                                              { codigo:  this.data.user.codigo,
                                                nombre:  this.data.user.nombre } )
                  .subscribe( data => { this.buscando = false; this.revisaDatosPeriodo( data ); },
                              err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); }
                            );
  }
  revisaDatosPeriodo( data ) {
    const rs = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : No existen períodos para representar', 2 );
    } else {
      this.periodos = rs;
    }
  }

  procesarVtasSucVendedorHist() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte:  2,
                                              empresa:  this.data.user.empresa,
                                              sucursal: this.codSucursal,
                                              periodo:  this.annomes },    // ventas sucursal, vendedor, mes actual
                                            { codigo: this.data.user.codigo,
                                              nombre: this.data.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosVendedores( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); }
        );
  }

  revisaDatosVendedores( data ) {
    let total = 0;
    const rs = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje      = [];
      const ejeTable = [];
      //
      rs.forEach( element => {
        if ( element.ventas > 0 ) {
          eje.push(     [ element.vendedor, element.ventas / 1000000 ] );
        }
        ejeTable.push( [ element.vendedor, {v: element.ventas, f: this.funciones.formatoNumero(element.ventas / 1000000, 2, 'es', '$ ' ) }, element.nombreven ] );
        total += element.ventas;
      });
      ejeTable.push( [ '>>>', {v: total, f: this.funciones.formatoNumero((total / 1000000), 2, 'es', '$ ' ) }, 'Totales' ] );
      // crear el grafico de pie
      const dataPie = new google.visualization.DataTable();
      dataPie.addColumn('string', 'Topping');
      dataPie.addColumn('number', 'Slices');
      dataPie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pieChart = new google.visualization.PieChart(document.getElementById('pie_chart_div13'));
      pieChart.draw(dataPie, {title: 'Sucursal : ' + rs[0].nombresuc,
                              width: '100%',
                              height: '100%',
                              chartArea: { left: '10',
                                           top: '20',
                                           bottom: '10',
                                           width: '100%',
                                           height: '100%'},
                             });
      //
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Vend.');
      dataTable.addColumn('number', 'Monto');
      dataTable.addColumn('string', 'Nombre');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div13'));
      table.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'});
    }
  }
}
