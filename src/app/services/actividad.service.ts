import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad';
import { BASE_ENDPOINT } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private baseEndpoint =  BASE_ENDPOINT + '/actividades';
  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor (private http: HttpClient){ }

  public lista(): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.baseEndpoint); 
  }

  public ver(id: number): Observable<Actividad>{
    return this.http.get<Actividad>(this.baseEndpoint+'/'+id); 
  }

  public crear(actividad:Actividad): Observable<Actividad>{
    return this.http.post<Actividad>(this.baseEndpoint,actividad,{headers:this.cabeceras}); 
  }

  public editar(actividad:Actividad): Observable<Actividad>{
    return this.http.put<Actividad>(this.baseEndpoint+'/'+actividad.id,actividad,{headers:this.cabeceras}); 
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

  public buscarPorNombreActividad(nombreActividad: string): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.baseEndpoint+'/searchActividades?filtro='+nombreActividad);
  }



}
