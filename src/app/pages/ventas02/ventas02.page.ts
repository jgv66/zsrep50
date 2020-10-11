import { Component, OnInit } from '@angular/core';
import { NetworkEngineService } from '../../services/network-engine.service';
import { FuncionesService } from '../../services/funciones.service';
import { DataLocalService } from 'src/app/services/data-local.service';

declare var google;

@Component({
  selector: 'app-ventas02',
  templateUrl: './ventas02.page.html',
  styleUrls: ['./ventas02.page.scss'],
})
export class Ventas02Page implements OnInit {

  sucursales: any;
  codSucursal: any;
  buscando = false;

  constructor( public  funciones: FuncionesService,
               private netWork: NetworkEngineService,
               private data: DataLocalService ) {}

  ngOnInit() {
    this.buscando = true;
    this.netWork.traeUnRpt( 'ksp_rpt_vtas', { reporte: 20,
                                              empresa: this.data.user.empresa },
                                            { codigo:  this.data.user.codigo,
                                              nombre:  this.data.user.nombre } )
        .subscribe( data => { this.buscando = false;
                              this.revisaDatosSucursal( data ); },
                    err  => { this.buscando = false;
                              this.funciones.msgAlert( 'ATENCION', err ); } );
  }

  revisaDatosSucursal( data ) {
    const rs = data.datos;
    // console.log( 'rs->', rs );
    if ( rs === undefined || rs.length === 0 ) {
      this.funciones.muestraySale('ATENCION : No existen sucursales para representar', 2 );
    } else {
      //
      this.sucursales = rs;
    }
  }

  procesarVtasSucVendedor() {
    this.buscando = true;
    this.netWork.traeUnRpt( 'ksp_rpt_vtas', { reporte:  2,
                                              empresa:  this.data.user.empresa,
                                              sucursal: this.codSucursal },    // ventas sucursal, vendedor, mes actual
                                            { codigo: this.data.user.codigo,
                                              nombre: this.data.user.nombre } )
        .subscribe( data => { this.buscando = false;
                              this.revisaDatosVendedores( data );  },
                    err  => { this.buscando = false;
                              this.funciones.msgAlert( 'ATENCION', err ); });
  }

  revisaDatosVendedores( data ) { 
    let total = 0;
    const rs = data.datos;
    // console.log( 'rs->', rs );
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
        ejeTable.push( [ element.vendedor, {v: element.ventas, f: this.funciones.formatoNumero( element.ventas / 1000000, 2, 'es', '$ ') }, element.nombreven ] );
        total += element.ventas;
      });
      ejeTable.push( [ '>>>', {v: total, f: this.funciones.formatoNumero( total / 1000000, 2, 'es', '$ ') }, 'Totales' ] );
      // crear el grafico de pie
      const dataPie = new google.visualization.DataTable();
      dataPie.addColumn('string', 'Topping');
      dataPie.addColumn('number', 'Slices');
      dataPie.addRows( eje );
      // Instantiate and draw our chart, passing in some options.
      const pieChart = new google.visualization.PieChart(document.getElementById('pie_chart_div2'));
      pieChart.draw(dataPie, { title: 'Sucursal : ' + rs[0].nombresuc,
                               width: '100%',
                               height: '100%',
                               chartArea: { left: '10',
                                            top: '20',
                                            bottom: '10',
                                            width: '100%',
                                            height: '100%' },
                              });

      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Vend.');
      dataTable.addColumn('number', 'Monto');
      dataTable.addColumn('string', 'Nombre');
      dataTable.addRows( ejeTable );
      const table = new google.visualization.Table(document.getElementById('table_div2'));
      table.draw(dataTable, {showRowNumber: true, width: '100%', height: '100%'});
    }
  }
}
