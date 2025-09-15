import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionGrupoService {
  private apiUrl = 'http://localhost:3000/api/suscripcion-grupo';

  constructor(private http: HttpClient) {}

  suscribir(id_feligres: number, id_grupo: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_feligres, id_grupo });
  }
    obtenerSuscripcionesPorFeligres(id_feligres: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feligres/${id_feligres}`);
  }
    eliminarSuscripcion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}