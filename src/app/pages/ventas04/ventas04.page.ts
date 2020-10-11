import { Component, OnInit } from '@angular/core';
import { NetworkEngineService } from '../../services/network-engine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DataLocalService } from 'src/app/services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas04',
  templateUrl: './ventas04.page.html',
  styleUrls: ['./ventas04.page.scss'],
})
export class Ventas04Page implements OnInit {

  buscando = false;

  constructor( private funciones: FuncionesService,
               private netWork: NetworkEngineService,
               public baseLocal: DataLocalService ) {}

  ngOnInit() {
    this.buscando = true;
    this.netWork.traeUnRpt( 'ksp_rpt_vtas', { reporte: 4,
                                              empresa: this.baseLocal.user.empresa },    // ventas sucursal, mes actual
                                            { codigo: this.baseLocal.user.codigo,
                                              nombre: this.baseLocal.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatos( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatos( data ) {
    let total = 0;
    const rs = data.datos;
    // console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos', 2 );
    } else {
      // datos para xAxis
      const eje       = [];
      const ejeTable = [];
      rs.forEach( element => {
        if ( element.ventas > 0 ) {
          eje.push(     [ element.vendedor, element.ventas / 1000000 ] );
        }
        ejeTable.push( [ element.vendedor, {v: element.ventas, f: this.funciones.formatoNumero( element.ventas / 1000000, 2, 'es', '$ ' ) }, element.nombreven ] );
        total += element.ventas;
      });
      ejeTable.push( [ '>>>', {v: total, f: this.funciones.formatoNumero( total / 1000000, 2, 'es', '$ ' ) }, 'Totales' ] );
      // crear el grafico de pie
      const dataPie = new google.visualization.DataTable();
      dataPie.addColumn('string', 'Vendedor');
      dataPie.addColumn('number', 'Venta');
      dataPie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pieChart = new google.visualization.PieChart(document.getElementById('pie_chart_div4'));
      const options   = { title: 'Mes actual : ' + this.funciones.nombreMes( rs[0].mes ),
                          width: '100%',
                          height: '100%',
                          chartArea: { left: '10',
                                       top: '20',
                                       bottom: '10',
                                       width: '100%',
                                       height: '100%' },
                        };
      pieChart.draw(dataPie, options );

      // tabla representando los datos
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Vend.');
      dataTable.addColumn('number', 'Monto');
      dataTable.addColumn('string', 'Descripción');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div4'));
      table.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'});
    }
  }
}
