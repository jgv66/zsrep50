import { Component, OnInit } from '@angular/core';
import { NetworkEngineService } from 'src/app/services/network-engine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DataLocalService } from '../../services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas012',
  templateUrl: './ventas012.page.html',
  styleUrls: ['./ventas012.page.scss'],
})
export class Ventas012Page implements OnInit {

  sucursales: any;
  codSucAnno: any;
  buscando = false;

  constructor( private funciones: FuncionesService,
               private network: NetworkEngineService,
               public data: DataLocalService ) {}

  ngOnInit() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte: 210,
                                              empresa: this.data.user.empresa },    // ventas sucursal, vendedor, mes actual
                                            { codigo:  this.data.user.codigo,
                                              nombre:  this.data.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosSucAnno( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosSucAnno( data ) {
    const rs = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : No existen sucursales para representar', 2 );
    } else {
      this.sucursales = rs;
    }
  }

  procesarVtasSucAnual() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte:  21,
                                              empresa:  this.data.user.empresa,
                                              sucursal: this.codSucAnno.substr(4, 3),
                                              periodo:  this.codSucAnno.substr(0, 4) },
                                            { codigo: this.data.user.codigo,
                                              nombre: this.data.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosAnnoSucursal( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosAnnoSucursal( data ) {
    let total  = 0;
    let totpas = 0;
    let dif    = 0;
    const rs   = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje      = [];
      const ejeTable = [];
      //
      eje.push(       [ 'Mes', 'Este año', 'Año Pasado' ]  );
      rs.forEach( element => {
          eje.push(       [ element.nombremes, element.ventas / 1000000, element.pasado/1000000 ] );
          dif = element.ventas - element.pasado;
          ejeTable.push( [ element.nombremes,
            { v: element.ventas, f: this.funciones.formatoNumero((element.ventas / 1000000), 2, 'es', '$ ') },
            { v: element.pasado, f: this.funciones.formatoNumero((element.pasado / 1000000), 2, 'es', '$ ') },
            { v: dif,            f: this.funciones.formatoNumero((dif / element.pasado) * 100, 2, 'es', '', '%') } ] );
          total  += element.ventas;
          totpas += element.pasado;
        });
      dif = total - totpas;
      ejeTable.push( [ '>>>',
                        { v: total,  f: this.funciones.formatoNumero((total    / 1000000), 2, 'es', '$ ') },
                        { v: totpas, f: this.funciones.formatoNumero((totpas   / 1000000), 2, 'es', '$ ') },
                        { v: dif,    f: this.funciones.formatoNumero((dif / totpas) * 100, 2, 'es', '', '%' ) }]);

      // crear el grafico de lineas curvas
      const dataLine = google.visualization.arrayToDataTable(eje);

      // Instantiate and draw our chart, passing in some options.
      const lineChart = new google.visualization.LineChart(document.getElementById('line_curve_chart12'));
      lineChart.draw(dataLine, { title: 'Sucursal/Año : ' + rs[0].nombresuc + '/' + this.codSucAnno.substr(0, 4),
                                 curveType: 'function',
                                 legend: { position: 'bottom' },
                                 width: '100%',
                                 height: '100%',
                                 chartArea:  { left: '10',
                                               top: '20',
                                               bottom: '50',
                                               width: '100%',
                                               height: '100%'},
                                });

      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Mes.');
      dataTable.addColumn('number', 'Este año');
      dataTable.addColumn('number', 'Año Pasado');
      dataTable.addColumn('number', '% Dif.');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div12'));
      // colocar un flecha
      const formatter = new google.visualization.ArrowFormat();
      formatter.format(dataTable, 3); // Apply formatter to second column

      table.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'});
    }
  }
}
