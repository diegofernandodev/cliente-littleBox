import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, pipe, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Egreso } from '../interfaces/egreso';
import { TenantService } from './tenant.service';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {
  private myAppUrl: string;
  private urlGet = 'obtenerTodosLosEgresos';
  private urlDelete = 'eliminarEgreso';
  private urlPost = 'guardarEgreso';
  private urlPut = 'modificarEgreso';
  private urlIpGet = 'obtenerEgreso';

  constructor(private http: HttpClient, private tenantService: TenantService) {
    this.myAppUrl = environment.endpoint;
  }


  getListaEgresos(): Observable<Egreso[]> {
    return this.http.get<Egreso[]>(`${this.myAppUrl}${this.urlGet}`);
  }


  deleteEgresos(id: any): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`);
  }


  saveEgresos(egreso: Egreso): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, egreso);
  }


  getEgreso(id: ObjectId): Observable<Egreso> {
    return this.http.get<Egreso>(`${this.myAppUrl}${this.urlIpGet}/${id}`);
  }

  updateEgreso(id: any, egreso: Egreso): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, egreso);
  }

  

}
