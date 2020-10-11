import { Component, OnInit } from '@angular/core';
import { NetworkEngineService } from 'src/app/services/network-engine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DataLocalService } from '../../services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas011',
  templateUrl: './ventas011.page.html',
  styleUrls: ['./ventas011.page.scss'],
})
export class Ventas011Page implements OnInit {

  periodos = [];
  periodo = '';
  buscando = false;

  constructor( private funciones: FuncionesService,
               private network: NetworkEngineService,
               public data: DataLocalService ) {}

  ngOnInit() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte: 11,
                                              empresa: this.data.user.empresa },    // ventas sucursal, historico
                                            { codigo: this.data.user.codigo,
                                              nombre: this.data.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosSucursal( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosSucursal( data ) {
    const rs = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : No existen períodos para representar', 2 );
    } else {
      this.periodos = rs;
    }
  }

  procesarVtasHSucursal() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte: 1,
                                              empresa: this.data.user.empresa,
                                              periodo: this.periodo },
                                            { codigo: this.data.user.codigo,
                                              nombre: this.data.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosHSucursal( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosHSucursal( data ) {
    let total = 0;
    let pm    = 0 ;
    const rs = data.datos;
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje       = [];
      const ejeTable = [];
      //
      rs.forEach( element => {
        if ( element.ventas > 0 ) {
          eje.push(     [ element.sucursal, element.ventas / 1000000 ] );
        }
        ejeTable.push( [ element.sucursal, {v: element.ventas, f: this.funciones.formatoNumero((element.ventas / 1000000), 2, 'es', '$ ' ) }, element.nombresuc ] );
        total += element.ventas;
        pm    += element.pm;
      });
      ejeTable.push( [ '>>>', {v: total     , f: this.funciones.formatoNumero((total / 1000000), 2, 'es', '$ ' ) }, 'Total Venta' ] );
      ejeTable.push( [ '>>>', {v: pm        , f: this.funciones.formatoNumero((pm    / 1000000), 2, 'es', '$ ' ) }, 'Total Costo' ] );
      // margen porcentual
      ejeTable.push( [ '>>>', {v: (total - pm), f: '' }, this.funciones.formatoNumero(((total - pm) / total) * 100, 2, 'es', '', '%' ) + ' margen' ] );

      // crear el grafico de pie
      const dataPie = new google.visualization.DataTable();
      dataPie.addColumn('string', 'Topping');
      dataPie.addColumn('number', 'Slices');
      dataPie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pieChart = new google.visualization.PieChart(document.getElementById('pie_chart_div11'));
      pieChart.draw(dataPie, { title: 'Período : ' + this.funciones.nombreMes( rs[0].mes ) + ' / ' + rs[0].anno.toLocaleString( 'es', { maximumFractionDigits: 0 } ),
                               width: '100%',
                               height: '100%',
                               chartArea: { left: '10',
                                            top: '20',
                                            bottom: '10',
                                            width: '100%',
                                            height: '100%'},
        } );

      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Suc.');
      dataTable.addColumn('number', 'Monto');
      dataTable.addColumn('string', 'Descripción');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div11'));
      table.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'});
    }
  }
}
