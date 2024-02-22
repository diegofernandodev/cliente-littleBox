import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, pipe, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { TenantService } from './tenant.service';
import { ObjectId } from 'mongodb';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private urlGet = 'obtenerTodosLosUsuarios';
  private urlDelete = 'eliminarUsuario';
  private urlPost = 'guardarUsuario';
  private urlPut = 'modificarUsuario';
  private urlIdGet = 'obtenerUsuario';
  private urlPostLogout = 'logout';
  private urlPostResetPassword = 'resetPassword';
  private urlPostNewPassword = 'newPassword';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListaUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}${this.urlGet}`);
  }

  deleteUsuario(id: any): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`);
  }

  saveUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`, user);
  }

  getUser(id: ObjectId): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.urlIdGet}/${id}`);
  }

  updateUser(id: any, user: User): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, user);
  }

  logoutUser(token: string): Observable<any> {
    // Implementa la lógica para cerrar sesión en el backend
    return this.http.post<void>(`${this.myAppUrl}${this.urlPostLogout}`, { token });
  }

  resetPassword(email:string, tenantId:string): Observable<any>{
    return this.http.post<void>(`${this.myAppUrl}${this.urlPostResetPassword}`,{email,tenantId});
  }

  restablecerPassword(token:string, password: string): Observable<any>{
    return this.http.post<void>(`${this.myAppUrl}${this.urlPostNewPassword}`,{token,password});
  }

}
