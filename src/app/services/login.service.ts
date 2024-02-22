import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, pipe, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Egreso } from '../interfaces/egreso';
import { TenantService } from './tenant.service';
import { ObjectId } from 'mongodb';
import { AuthServiceService } from "../services/auth-service.service";
import { LoginResponse } from "../interfaces/loginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl: string;
  
  private urlPostLogin = 'login';
  

   // Variable privada para almacenar el token
   private authToken: string | null = null;
  
  constructor(private http: HttpClient, private authService: AuthServiceService) {
    this.myAppUrl = environment.endpoint;
  }

  loginUser(email: string, password: string): Observable<HttpResponse<LoginResponse>> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.myAppUrl}${this.urlPostLogin}`, body, { observe: 'response' })
      .pipe(
        // Extraer y almacenar el token de la respuesta en AuthService
        tap(response => {
          console.log("servicio login response funcionando..1");
          // const token = response.headers.get('Authorization');
          const token = response.body?.data?.token; // Obtener el token del cuerpo de la respuesta
          console.log('Token obtenido:', token);
          if (typeof token === 'string') {
            this.authService.setToken(token);
            console.log("tokeeeeen", token);
            
          }
        })
      );
  }

  // // Método para obtener el token
  // getToken(): string | null {
  //   return this.authToken;
  // }

}
