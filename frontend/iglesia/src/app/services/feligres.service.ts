import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeligresService {
  private apiUrl = 'http://localhost:3000/api/feligres';
  private usuarioUrl = 'http://localhost:3000/api/usuario';

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