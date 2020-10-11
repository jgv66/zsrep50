import { Component, OnInit } from '@angular/core';
import { NetworkEngineService } from 'src/app/services/network-engine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DataLocalService } from '../../services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas01',
  templateUrl: './ventas01.page.html',
  styleUrls: ['./ventas01.page.scss'],
})
export class Ventas01Page implements OnInit {

  datos: any;
  buscando = false;

  constructor( private funciones: FuncionesService,
               private network: NetworkEngineService,
               public data: DataLocalService ) { }

  ngOnInit() {
    this.buscando = true;
    this.network.traeUnRpt( 'ksp_rpt_vtas', { reporte: 1,
                                              empresa: this.data.user.empresa },
                                            { codigo: this.data.user.codigo,
                                              nombre: this.data.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatos( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatos( data ) {
    let total = 0;
    const rs = data.datos;
    // console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos para representar', 2 );
    } else {
      // datos para xAxis
      const eje       = [];
      const ejeTable = [];
      rs.forEach( element => {
        if ( element.ventas > 0 ) {
          eje.push(     [ element.sucursal, element.ventas / 1000000 ] );
        }
        ejeTable.push( [ element.sucursal, {v: element.ventas, f: this.funciones.formatoNumero((element.ventas / 1000000), 2, 'es', '$ ') }, element.nombresuc ] );
        total += element.ventas;
      });
      ejeTable.push( [ '>>>', {v: total, f: this.funciones.formatoNumero( (total / 1000000), 2, 'es', '$ ') }, 'Totales' ] );
      // crear el grafico de pie
      const dataPie = new google.visualization.DataTable();
      dataPie.addColumn('string', 'Sucursal');
      dataPie.addColumn('number', 'Venta');
      dataPie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pieChart = new google.visualization.PieChart(document.getElementById('pie_chart_div1'));
      const options   = { title: 'Mes actual : ' + this.funciones.nombreMes( rs[0].mes ),
                          width: '100%',
                          height: '100%',
                          chartArea: { left: '10',
                                       top: '20',
                                       bottom: '50',
                                       width: '100%',
                                       height: '100%'},
      };
      pieChart.draw(dataPie, options );

      // tabla representando los datos
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Suc.');
      dataTable.addColumn('number', 'Monto');
      dataTable.addColumn('string', 'Descripción');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div1'));
      table.draw(dataTable, {showRowNumber: false, width: '100%', height: '100%'});
    }
  }

}
