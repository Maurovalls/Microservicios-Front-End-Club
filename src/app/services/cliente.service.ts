import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { BASE_ENDPOINT } from '../config/app';
import { Cuota } from '../models/cuota';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseEndpoint =  BASE_ENDPOINT + '/clientes';
  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  public lista(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseEndpoint); 
  }

  public ver(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(this.baseEndpoint+'/'+id); 
  }

  public crear(cliente:Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.baseEndpoint,cliente,{headers:this.cabeceras}); 
  }

  public editar(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.baseEndpoint+'/'+cliente.id,cliente,{headers:this.cabeceras}); 
  }

  public eliminar(id:number): Observable<void>{
     return this.http.delete<void>(this.baseEndpoint+'/'+id); 
  }

  public listarPaginas(page:string, size:string): Observable<any>{
    const params = new HttpParams()
    .set('page',page)
    .set('size',size);
    return this.http.get<any>(this.baseEndpoint+'/pagina', {params:params}); 
  }

  public crearFoto(cliente: Cliente, archivo: File): Observable<Cliente>{
    const formData = new FormData();
    formData.append('archivo',archivo);
    formData.append('nombre',cliente.nombre);
    formData.append('apellido',cliente.apellido);
    formData.append('telefono',cliente.telefono);
    formData.append('descripcion',cliente.descripcion);
    return this.http.post<Cliente>(this.baseEndpoint+'/crear-foto',formData);
  }

  public editarFoto(cliente: Cliente, archivo: File): Observable<Cliente>{
    const formData = new FormData();
    formData.append('archivo',archivo);
    formData.append('nombre',cliente.nombre);
    formData.append('apellido',cliente.apellido);
    formData.append('telefono',cliente.telefono);
    formData.append('descripcion',cliente.descripcion);
    return this.http.put<Cliente>(this.baseEndpoint+'/editar-foto/'+cliente.id,formData);
  }

  public asginarCuotas(cliente: Cliente, cuotas: Cuota[]): Observable<Cliente>{
    return this.http.put<Cliente>(this.baseEndpoint+'/'+cliente.id+'/asignar-cuotas',cuotas,
     {headers: this.cabeceras});
  }

  public eliminarCuota(cliente: Cliente, cuota: Cuota): Observable<Cliente>{
    return this.http.put<Cliente>(this.baseEndpoint+'/'+cliente.id+'/eliminar-cuota',cuota,
    {headers: this.cabeceras});
  }

  public asginarActividades(cliente: Cliente, actividades: Actividad[]): Observable<Cliente>{
    return this.http.put<Cliente>(this.baseEndpoint+'/'+cliente.id+'/asignar-actividades',actividades,
     {headers: this.cabeceras});
  }

  public eliminarActividad(cliente: Cliente, actividad: Actividad): Observable<Cliente>{
    return this.http.put<Cliente>(this.baseEndpoint+'/'+cliente.id+'/eliminar-actividad',actividad,
    {headers: this.cabeceras});
  }

  public buscarClientePorNombre(nombre: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseEndpoint+'/searchCuotas?filtro='+nombre);
  }

}
