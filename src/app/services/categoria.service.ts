import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categorias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private myAppUrl: string;
  private urlGet = ""
  private urlDelete = "";
  private urlPost = "";
  private urlPut = "";
  private urlIpGet = "";

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.urlGet = "obtenerTodasLasCategorias"
    this.urlDelete = "eliminarCategoria"
    this.urlPost = "guardarCategoria"
    this.urlPut = "modificarCategoria"
    this.urlIpGet = "obtenerCategoria"
   }

   getListaCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.urlGet}`);
   }
 
   deleteCategoria(id: any): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`);
   }
   
 
   saveCategoria(categoria: Categoria): Observable<void> {
     return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`,categoria)
   }
 
   getCategoria(id: any): Observable<Categoria> {
     return this.http.get<Categoria>(`${this.myAppUrl}${this.urlIpGet}/${id}`)
   }
 
   updateCategoria(id: any, categoria: Categoria): Observable<void> {
     return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, categoria);
   }
}
