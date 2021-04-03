import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Cuota } from 'src/app/models/cuota';
import { ClienteService } from 'src/app/services/cliente.service';
import { CuotaService } from 'src/app/services/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-cuotas',
  templateUrl: './asignar-cuotas.component.html',
  styleUrls: ['./asignar-cuotas.component.css']
})
export class AsignarCuotasComponent implements OnInit {

  cliente: Cliente;
  cuotasAsignar: Cuota[] = [];
  cuotas: Cuota[] = [];

  dataSource: MatTableDataSource<Cuota>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;
  mostrarColumnas: string[]=['nombreSocio','importe','descripcion','seleccion'];
  mostrarColumnasCuotas: string[]=['id','nombreSocio','importe','descripcion', 'eliminar'];

  seleccion: SelectionModel<Cuota> = new SelectionModel<Cuota>(true, []);

  constructor(private route: ActivatedRoute,
    private clienteService: ClienteService,
    private cuotaService: CuotaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number = +params.get('id');
      this.clienteService.ver(id).subscribe( c => {
        this.cliente = c;
        this.cuotas = this.cliente.cuotas;
        this.iniciarPaginador();
      });
    });
  }

  private iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Cuota>(this.cuotas);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Registros por paginas";
  }

  public filtrar(nombre: string): void{
    nombre = nombre != undefined? nombre.trim(): '';
    if(nombre !== ''){
      this.cuotaService.buscarPorNombreSocio(nombre).subscribe(cuotas => this.cuotasAsignar = cuotas.filter(c => {
        let filtrar = true;
        this.cuotas.forEach(cc => {
          if(c.id === cc.id){
            filtrar = false;
          }
        });
        return filtrar;
      }));
    }   
  }

  public  estanTodosSeleccionados(): boolean{
    const seleccionados = this.seleccion.selected.length;
    const numeroCuotas = this.cuotasAsignar.length;
    return(seleccionados === numeroCuotas);
  }

  public seleccionarDesSeleccionarTodos(): void{
    this.estanTodosSeleccionados()?
    this.seleccion.clear():
    this.cuotasAsignar.forEach(c => this.seleccion.select(c));
  }

  public asignar(): void{
    console.log(this.seleccion.selected);
    this.clienteService.asginarCuotas(this.cliente, this.seleccion.selected)
    .subscribe(c => {
      this.tabIndex = 2;
      Swal.fire('Asignados: ', 'Cuotas asignadas con exito al cliente'+this.cliente.nombre, 'success');
      this.cuotas = this.cuotas.concat(this.seleccion.selected);
      this.iniciarPaginador();
      this.cuotasAsignar = [];
      this.seleccion.clear();
    },
    e => {
      if(e.status === 500 ){
        const mensaje = e.error.message as string;
        if(mensaje.indexOf('ConstraintViolationException') > -1){
          Swal.fire('Cuidado:', 'No se puede asignar esta cuota, ya esta asociado a otro cliente.', 'error');
        }
      }
    });
  }

  public eliminarCuota(cuota: Cuota): void{
    Swal.fire({
      title: 'Cuidado:',
      text: '¿Seguro que desea eliminar la cuota ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.eliminarCuota(this.cliente, cuota).subscribe(cliente => {
          this.cuotas = this.cuotas.filter(c => c.id !== cuota.id);
          this.iniciarPaginador();
          Swal.fire('Eliminada:', 'Cuota eliminada con exito del cliente.', 'success');
        });

      }
    });
  }

}
