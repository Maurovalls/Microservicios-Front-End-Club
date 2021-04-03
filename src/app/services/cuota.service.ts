import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuota } from '../models/cuota';
import { BASE_ENDPOINT } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private baseEndpoint =  BASE_ENDPOINT + '/cuotas';
  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  public lista(): Observable<Cuota[]>{
    return this.http.get<Cuota[]>(this.baseEndpoint); 
  }

  public ver(id: number): Observable<Cuota>{
    return this.http.get<Cuota>(this.baseEndpoint+'/'+id); 
  }

  public crear(cuota:Cuota): Observable<Cuota>{
    return this.http.post<Cuota>(this.baseEndpoint,cuota,{headers:this.cabeceras}); 
  }

  public editar(cuota:Cuota): Observable<Cuota>{
    return this.http.put<Cuota>(this.baseEndpoint+'/'+cuota.id,cuota,{headers:this.cabeceras}); 
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

  public buscarPorNombreSocio(nombreSocio: string): Observable<Cuota[]>{
    return this.http.get<Cuota[]>(this.baseEndpoint+'/searchCuotas?filtro='+nombreSocio);
  }




}
