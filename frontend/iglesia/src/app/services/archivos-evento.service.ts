import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosEventoService {
  private apiUrl = 'http://localhost:3000/api/archivos-evento';

  constructor(private http: HttpClient) {}

  listarImagenes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  subirArchivo(archivo: File, detalle: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('detalle', detalle);
    return this.http.post<any>(this.apiUrl, formData);
  }
    reemplazarArchivo(id: number, archivo: File, detalle: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('detalle', detalle);
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarArchivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
