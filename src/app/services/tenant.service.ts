import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

private tenantSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

setTenant(tenantId: string): void {
  this.tenantSubject.next(tenantId);
}

getTenant(): Observable<string | null> {
  return this.tenantSubject.asObservable();
}

 // Método para obtener el valor actual del tenant
 getTenantValue(): string | null {
  return this.tenantSubject.value;
}
}