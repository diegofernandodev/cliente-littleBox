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
  private urlIncrement = 'incrementarSecuencia';


  constructor(private http: HttpClient, private tenantService: TenantService) {
    this.myAppUrl = environment.endpoint;
  }


  // getListaEgresos(): Observable<Egreso[]> {
  //   return this.tenantService.getTenant().pipe(
  //     switchMap((tenantId) => {
  //       const headers = new HttpHeaders().set("X-Tenant_Id", tenantId || " ");
  //       return this.http.get<Egreso[]>(`${this.myAppUrl}${this.urlGet}`, { headers });
  //     })
  //   )
  // }

  getListaEgresos(tenantId: string): Observable<Egreso[]> {
    const headers = new HttpHeaders().set('x-tenant-id', tenantId);
    return this.http.get<Egreso[]>(`${this.myAppUrl}${this.urlGet}`, { headers });
  }
  

  // deleteEgresos(id: any): Observable<void> {
  //   return this.tenantService.getTenant().pipe(
  //     switchMap((tenantId) => {
  //       const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
  //       return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`, { headers });
  //     })
  //   );
  // }

  deleteEgresos(id: any, tenantId:string): Observable<void> {
   
        const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
        return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`, { headers });
      
    
  }

  // saveEgresos(egreso: Egreso): Observable<void> {
  //   return this.tenantService.getTenant().pipe(
  //     switchMap((tenantId) => {
  //       const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
  //       return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, egreso, { headers });
  //     })
  //   );
  // }

  saveEgresos(egreso: Egreso, tenantId:string): Observable<void> {
    
        const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
        return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, egreso, { headers });
  
  }

  // getEgreso(id: ObjectId): Observable<Egreso> {
  //   return this.tenantService.getTenant().pipe(
  //     switchMap((tenantId) => {
  //       const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
  //       return this.http.get<Egreso>(`${this.myAppUrl}${this.urlIpGet}/${id}`, { headers });
  //     })
  //   );
  // }
  getEgreso(id: ObjectId, tenantId:string): Observable<Egreso> {
    
        const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
        return this.http.get<Egreso>(`${this.myAppUrl}${this.urlIpGet}/${id}`, { headers });
    
  }

  // updateEgreso(id: any, egreso: Egreso): Observable<void> {
  //   return this.tenantService.getTenant().pipe(
  //     switchMap((tenantId) => {
  //       const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
  //       return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, egreso, { headers });
  //     })
  //   );
  // }
  updateEgreso(id: any, egreso: Egreso, tenantId:string): Observable<void> {
   
        const headers = new HttpHeaders().set("x-tenant-id", tenantId || " ");
        return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, egreso, { headers });
  }
  // incrementarSecuencia(): Observable<number> {
  //   return this.tenantService.getTenant().pipe(
  //     switchMap((tenantId) => {
  //       const headers = new HttpHeaders().set("X-Tenant_Id", tenantId || " ");
  //       return this.http.put<void>(`${this.myAppUrl}${this.urlIncrement}`,{ headers });
  //     })
  //   );
  // }
  
 // En tu servicio de egresos
setTenantForTesting(tenantId: string): void {
  this.tenantService.setTenant(tenantId);
}

}
