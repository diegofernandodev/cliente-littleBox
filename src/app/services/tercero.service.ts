import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tercero } from '../interfaces/terceros';
import { Observable } from 'rxjs';

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
  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
   }
}
