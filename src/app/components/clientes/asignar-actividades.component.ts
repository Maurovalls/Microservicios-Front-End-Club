import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { Cliente } from 'src/app/models/cliente';
import { ActividadService } from 'src/app/services/actividad.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-asignar-actividades',
  templateUrl: './asignar-actividades.component.html',
  styleUrls: ['./asignar-actividades.component.css']
})
export class AsignarActividadesComponent implements OnInit {

  cliente: Cliente;
  autocompleteControl = new FormControl();
  actividadesFiltradas: Actividad[] = [];
  actividadesAsignar: Actividad[] = [];
  actividades: Actividad[] = [];
  mostrarColumnas = ['nombre', 'eliminar'];
  mostrarColumnasActividades = ['id','nombre','eliminar'];
  tabIndex = 0;
  dataSource: MatTableDataSource<Actividad>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];


  constructor(private route: ActivatedRoute,
    private clienteService: ClienteService,
    private actividadService: ActividadService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.clienteService.ver(id).subscribe(c  => {
         this.cliente = c;
         this.actividades = this.cliente.actividades;
         this.iniciarPaginador();
        });
    });
    this.autocompleteControl.valueChanges.pipe(
      map(valor => typeof valor === 'string' ? valor : valor.nombre),
      flatMap(valor => valor ? this.actividadService.buscarPorNombreActividad(valor) : [])

    ).subscribe(actividades => this.actividadesFiltradas = actividades);
  }

  private iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Actividad>(this.actividades);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Registros por paginas";
  }

  public mostrarNombre(actividad?: Actividad): string {
    return actividad ? actividad.nombre : '';
  }

  public seleccionarActividad(event: MatAutocompleteSelectedEvent): void {
    const actividad = event.option.value as Actividad;
    if (!this.existe(actividad.id)) { 
    this.actividadesAsignar = this.actividadesAsignar.concat(actividad);
    console.log(this.actividadesAsignar);
  }else{
    Swal.fire('Error:', 'La actividad '+actividad.nombre+' ya esta asignada al cliente', 'error');
  }
  this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
}

private existe(id: number): boolean{
  let existe = false;
  this.actividadesAsignar.concat(this.actividades)
    .forEach(a => {
      if (id === a.id) {
        existe = true;
      }
    });
  return existe;
}

public eliminarDelAsignar(actividad): void{
  this.actividadesAsignar = this.actividadesAsignar.filter(
    a => actividad.id !== a.id
  );
}

public asignar(): void{
  console.log(this.actividadesAsignar);
  this.clienteService.asginarActividades(this.cliente, this.actividadesAsignar).subscribe(
    cliente => {
      this.actividades = this.actividades.concat(this.actividadesAsignar);
      this.iniciarPaginador();
      this.actividadesAsignar = [];
      Swal.fire('Asignados:', 'Actividades asignadas con exito', 'success');
      this.tabIndex = 2;
    }
  )  
}

public eliminarActividad(actividad: Actividad): void{
  Swal.fire({
    title: 'Cuidado:',
    text: '¿Seguro que desea eliminar la actividad ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.value) {
      this.clienteService.eliminarActividad(this.cliente, actividad).subscribe(cliente => {
        this.actividades = this.actividades.filter(a => a.id !== actividad.id);
        this.iniciarPaginador();
        Swal.fire('Eliminada:', 'Actividad eliminada con exito del cliente.', 'success');
      });
    }
  });

}


}
