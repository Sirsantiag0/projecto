import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeligresService {
  private apiUrl = new URL('api/feligres', environment.apiBaseUrl).toString();
  private usuarioUrl = new URL('api/usuario', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {}

  crearFeligres(feligres: any): Observable<any> {
    return this.http.post(this.apiUrl, feligres);
  }
  
  listarFeligreses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  actualizarFeligres(id: number, feligres: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, feligres);
  }

  eliminarFeligres(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  actualizarRol(id: number, id_rol: number): Observable<any> {
    return this.http.put(`${this.usuarioUrl}/${id}`, { id_rol });
  }
}