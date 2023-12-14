import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tercero } from '../interfaces/terceros';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class TerceroService {
  private myAppUrl: string;
  urlGet = "obtenerTodosLosTerceros"
  urlDelete = "eliminarTercero"
  urlPost = "guardarTercero"
  urlPut = "modificarTercero"
  urlIpGet = "obtenerTercero"

  constructor(private http: HttpClient, private tenantService: TenantService) {
    this.myAppUrl = environment.endpoint;
  }

  getListaTerceros(): Observable<Tercero[]> {
    return this.http.get<Tercero[]>(`${this.myAppUrl}${this.urlGet}`);
  }


  deleteTerceros(id: any): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`);
  }


  saveTercero(tercero: Tercero): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, tercero);
  }


  getTercero(id: ObjectId): Observable<Tercero> {
    return this.http.get<Tercero>(`${this.myAppUrl}${this.urlIpGet}/${id}`);
  }


  updateTercero(id: any, tercero: Tercero): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, tercero);
  }

}
