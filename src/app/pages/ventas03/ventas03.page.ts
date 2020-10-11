import { Component, OnInit } from '@angular/core';
import { NetworkEngineService } from '../../services/network-engine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DataLocalService } from 'src/app/services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas03',
  templateUrl: './ventas03.page.html',
  styleUrls: ['./ventas03.page.scss'],
})
export class Ventas03Page implements OnInit {

  codVendedor = '';
  vendedores = [];
  buscando = false;

  constructor( private funciones: FuncionesService,
               private netWork: NetworkEngineService,
               public baseLocal: DataLocalService ) {}

  ngOnInit() {
    this.buscando = true;
    this.netWork.traeUnRpt( 'ksp_rpt_vtas', { reporte: 30,
                                              empresa: this.baseLocal.user.empresa },
                                            { codigo: this.baseLocal.user.codigo,
                                              nombre: this.baseLocal.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosSucursal( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosSucursal( data ) {
    const rs = data.datos;
    // console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : No existen sucursales', 2 );
    } else {
      this.vendedores = rs;
    }
  }

  procesarVtasVenSucursal() {
    this.buscando = true;
    this.netWork.traeUnRpt( 'ksp_rpt_vtas', { reporte:  3,
                                              empresa:  this.baseLocal.user.empresa,
                                              vendedor: this.codVendedor },
                                            { codigo: this.baseLocal.user.codigo,
                                              nombre: this.baseLocal.user.nombre } )
        .subscribe( data => { this.buscando = false; this.revisaDatosVendedores( data );  },
                    err  => { this.buscando = false; this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosVendedores( data ) { 
    let total = 0;
    const rs = data.datos;
    // console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : Período y sucursales no presentan datos', 2 );
    } else {
      // datos para xAxis
      const eje      = [];
      const ejeTable = [];
      //
      rs.forEach( element => {
        if ( element.ventas > 0 ) {
          eje.push(     [ element.sucursal, element.ventas / 1000000 ] );
        }
        ejeTable.push( [ element.sucursal, {v: element.ventas, f: this.funciones.formatoNumero( element.ventas / 1000000, 2, 'es', '$ ' ) }, element.nombresuc ] );
        total += element.ventas;
      });
      ejeTable.push( [ '>>>', {v: total, f: this.funciones.formatoNumero( total / 1000000, 2, 'es', '$ ' ) }, 'Totales' ] );
      // crear el grafico de pie
      const dataPie = new google.visualization.DataTable();
      dataPie.addColumn('string', 'Topping');
      dataPie.addColumn('number', 'Slices');
      dataPie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pieChart = new google.visualization.PieChart(document.getElementById('pie_chart_div3'));
      pieChart.draw(dataPie, {title: 'Vendedor : ' + rs[0].nombreven,
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
      dataTable.addColumn('string', 'Nombre');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div3'));
      table.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'});
    }
  }
}
