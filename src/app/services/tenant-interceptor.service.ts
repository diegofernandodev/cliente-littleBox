import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenantService } from './tenant.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantInterceptorService implements HttpInterceptor {

  constructor(private tenantService: TenantService) { }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   // Obtener las cabeceras actuales
   let headers = httpRequest.headers;

   // Suscribirse al Observable para obtener el valor actual del tenant
   this.tenantService.getTenant().subscribe(tenantId => {
     // Proporcionar un valor predeterminado si tenantId es undefined
     const tenantHeaderValue = (tenantId !== undefined && tenantId !== null) ? tenantId.toString() : '';

     // Crear una nueva instancia de HttpHeaders con el nuevo valor
     headers = headers.set('x-tenant-id', tenantHeaderValue);
   });

   // Clonar la solicitud con las nuevas cabeceras y continuar con la solicitud clonada
   const clonedRequest = httpRequest.clone({ headers });
   return next.handle(clonedRequest);
 }
}
