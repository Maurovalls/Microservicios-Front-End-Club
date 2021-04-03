import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  titulo = "Registrar cliente";
  cliente: Cliente = new Cliente();
  error: any;
  private fotoSeleccionada: File;

  constructor(private service: ClienteService,
     private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number = +params.get('id');
      if(id){
        this.service.ver(id).subscribe(cliente =>{
          this.cliente = cliente;
        })
      }
    })
  }

  public crear(): void{
    if(!this.fotoSeleccionada){
    this.service.crear(this.cliente).subscribe(cliente => {
      console.log(cliente);
      Swal.fire('Nuevo: ','Cliente ' +cliente.nombre+ ' creado con exito ','success');
      this.router.navigate(['/clientes']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
    }else{
    this.service.crearFoto(this.cliente, this.fotoSeleccionada).subscribe(cliente => {
      console.log(cliente);
      Swal.fire('Nuevo: ','Cliente ' +cliente.nombre+ ' creado con exito ','success');
      this.router.navigate(['/clientes']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });

  }

  }

  public editar(): void{
    if(!this.fotoSeleccionada){
    this.service.editar(this.cliente).subscribe(cliente => {
      console.log(cliente);
      Swal.fire('Modificado: ','Cliente ' +cliente.nombre+ ' actualizado con exito ','success');
      this.router.navigate(['/clientes']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
    }else{
      this.service.editarFoto(this.cliente, this.fotoSeleccionada).subscribe(cliente => {
        console.log(cliente);
        Swal.fire('Modificado: ','Cliente ' +cliente.nombre+ ' actualizado con exito ','success');
        this.router.navigate(['/clientes']);
      }, err =>{
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });

    }

    
  }

  public foto(event): void{
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
      Swal.fire('Error al seleccionar la foto:', 'El archivo debe ser de tipo imagen', 'error');
    }
  }


 
}
