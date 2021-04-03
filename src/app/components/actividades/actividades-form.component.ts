import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { Horario } from 'src/app/models/horario';

@Component({
  selector: 'app-actividades-form',
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.css']
})
export class ActividadesFormComponent implements OnInit {

  titulado = "Registrar actividad";
  actividad: Actividad = new Actividad();
  error: any;

  constructor(private service: ActividadService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id: number = +params.get('id');
      if(id){
        this.service.ver(id).subscribe(actividad =>{
          this.actividad = actividad;
        })
      }
    })
  }

  public crear(): void{
    if(this.actividad.horarios.length === 0){
      Swal.fire('Error Horarios', 'Actividad debe tener horario', 'error');
      return;
    }
    this.eliminarHorariosVacios();
    this.service.crear(this.actividad).subscribe(actividad => {
      console.log(actividad);
      Swal.fire('Nuevo: ','Actividad creada con exito ','success');
      this.router.navigate(['/actividades']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar(): void{
    if(this.actividad.horarios.length === 0){
      Swal.fire('Error Horarios', 'Actividad debe tener horario', 'error');
      return;
    }
    this.eliminarHorariosVacios();
    this.service.editar(this.actividad).subscribe(actividad => {
      console.log(actividad);
      Swal.fire('Modificado: ','Actividad actualizada con exito ','success');
      this.router.navigate(['/actividades']);
    }, err =>{
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public agregarHorario(): void{
    this.actividad.horarios.push(new Horario());
  }

  public asignarDiaHora(horario: Horario, event: any): void{
    horario.diaHora= event.target.value as string;
    console.log(this.actividad);
  }

  public eliminarHorario(horario): void{
    this.actividad.horarios = this.actividad.horarios.filter(p => horario.diaHora !== p.diaHora);
  }

  
  public eliminarHorariosVacios(): void{
    this.actividad.horarios = this.actividad.horarios.filter(p => p.diaHora != null && p.diaHora.length > 0);
  }
  


}
