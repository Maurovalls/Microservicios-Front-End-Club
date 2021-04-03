import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/services/cuota.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css']
})
export class CuotasComponent implements OnInit {

  baseEndpoint =  BASE_ENDPOINT+'/cuotas';
  titulado = 'Listado de Cuotas';
  cuotas: Cuota[];
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private service: CuotaService) { }

  ngOnInit(): void {
    this.calcularRangos();
  } 

  public paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }
  

  private calcularRangos(){
    this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
    .subscribe(p =>
      {
        this.cuotas = p.content as Cuota[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina:';
      });
  }
  

  public eliminar(cuota: Cuota): void{
    Swal.fire({
      title: 'Cuidado:',
      text: '¿Seguro que desea eliminar la cuota ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(cuota.id).subscribe(() => {
          //this.cuotas = this.cuotas.filter(c => c != cuota);
          this.calcularRangos();
          Swal.fire('Eliminado: ','Cuota eliminado con exito ', 'success');
        });    
      }
    });
  }

}



