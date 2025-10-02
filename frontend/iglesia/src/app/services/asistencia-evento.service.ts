import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Evento {
  id?: number;
  fecha: string;
  hora: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
// Servicio para CRUD de eventos de asistencia
export class AsistenciaEventoService {
  private apiUrl = new URL('api/eventos', environment.apiBaseUrl).toString(); // Asegúrate de usar la URL correcta
  private asistenciaUrl = new URL('api/asistencia-evento', environment.apiBaseUrl).toString();
  constructor(private http: HttpClient) {}

  // Crear un nuevo evento
  crearEvento(evento: Evento): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  // Obtener todos los eventos
  listarEventos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un evento específico por ID
  obtenerEvento(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un evento
  actualizarEvento(id: number, evento: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  // Inactivar un evento (marcar como inactivo)
  inactivarEvento(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/inactivar`, {});
  }

  // Eliminar un evento permanentemente
  eliminarEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  registrarAsistencia(asistencia: { id_evento: number; id_feligres: number }): Observable<any> {
    return this.http.post(this.asistenciaUrl, asistencia);
  }

  obtenerAsistenciasPorFeligres(feligresId: number): Observable<any> {
    return this.http.get<any>(`${this.asistenciaUrl}/feligreses/${feligresId}/asistencias`);
  }

  eliminarAsistencia(id: number): Observable<any> {
    return this.http.delete(`${this.asistenciaUrl}/${id}`);
  }
  // getMedics(): Observable<any> {
    // const headers = this.getHeaders(); // Obtener encabezados con el token
    // return this.http.get<any>(${environment.apiUrl}/api/Account/Medics, { headers });
  // }
}
