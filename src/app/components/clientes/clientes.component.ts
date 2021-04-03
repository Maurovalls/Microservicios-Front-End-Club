import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  
  baseEndpoint =  BASE_ENDPOINT+'/clientes';
  titulo = 'Listado de Clientes';
  clientes: Cliente[];
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClienteService) { }

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
        this.clientes = p.content as Cliente[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina:';
      });
  }

  public eliminar(cliente: Cliente): void{
    Swal.fire({
      title: 'Cuidado:',
      text: '¿Seguro que desea eliminar al socio '+cliente.nombre+ '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(cliente.id).subscribe(() => {
         // this.clientes = this.clientes.filter(c => c != cliente);
          this.calcularRangos();
          Swal.fire('Eliminado: ','Cliente '+cliente.nombre+' eliminado con exito ', 'success');
        });    
      }
    });
  }

  

}
