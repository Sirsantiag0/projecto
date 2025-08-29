import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
// EventoService
export class AsistenciaEventoService {
  private apiUrl = 'http://localhost:3000/api/eventos'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) { 

  }

  // Crear un nuevo evento
  crearEvento(evento: any): Observable<any> {
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
  actualizarEvento(id: number, evento: any): Observable<any> {
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
  // getMedics(): Observable<any> {
    // const headers = this.getHeaders(); // Obtener encabezados con el token
    // return this.http.get<any>(${environment.apiUrl}/api/Account/Medics, { headers });
  // }
}
