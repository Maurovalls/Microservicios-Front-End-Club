import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ActividadService } from 'src/app/services/actividad.service';
import { Actividad } from 'src/app/models/actividad';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  baseEndpoint =  BASE_ENDPOINT+'/actividades';
  titulado = 'Listado de actividades';
  actividades: Actividad[];
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ActividadService) { }

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
        this.actividades = p.content as Actividad[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina:';
      });
  }

  public eliminar(actividad: Actividad): void{
    Swal.fire({
      title: 'Cuidado:',
      text: '¿Seguro que desea eliminar la actividad '+actividad.nombre+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(actividad.id).subscribe(() => {
         // this.actividades = this.actividades.filter(c => c != actividad);
          this.calcularRangos();
          Swal.fire('Eliminado: ','actividad eliminada con exito ', 'success');
        });    
      }
    });
  }

}






