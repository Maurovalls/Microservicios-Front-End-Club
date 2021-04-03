import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/services/cuota.service';

@Component({
  selector: 'app-cuotas-form',
  templateUrl: './cuotas-form.component.html',
  styleUrls: ['./cuotas-form.component.css']
})
export class CuotasFormComponent implements OnInit {

  titulo = "Crear cuota";
  cuota: Cuota = new Cuota();
  error: any;

  constructor(private service: CuotaService,
    private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number = +params.get('id');
      if(id){
        this.service.ver(id).subscribe(cuota =>{
          this.cuota = cuota;
        })
      }
    })
  }

  public crear(): void{
    this.service.crear(this.cuota).subscribe(cuota => {
      console.log(cuota);
      Swal.fire('Nuevo: ','Cuota creada con exito ','success');
      this.router.navigate(['/cuotas']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar(): void{
    this.service.editar(this.cuota).subscribe(cuota => {
      console.log(cuota);
      Swal.fire('Modificado: ','Cuota actualizada con exito ','success');
      this.router.navigate(['/cuotas']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }
    



}


