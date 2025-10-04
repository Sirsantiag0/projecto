import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Servicio {
  id?: number;
  descripcion: string;
  activo?: boolean;
  requisitos?: string[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private readonly apiUrl = new URL('/api/servicios', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {}

  listarServicios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  crearServicio(descripcion: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { descripcion });
  }

  actualizarServicio(id: number, descripcion: string, activo?: boolean): Observable<any> {
    const payload: Partial<Servicio> = { descripcion };
    if (activo !== undefined) {
      payload.activo = activo;
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  inactivarServicio(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/inactivar`, {});
  }

  eliminarServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}