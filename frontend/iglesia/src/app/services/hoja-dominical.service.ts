import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HojaDominicalService {
 private apiUrl = new URL('api/hoja-dominical', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {}

  crearHojaDominical(archivo: File, fecha: string, titulo: string): Observable<any> {
    const formData = new FormData();
    formData.append('ruta_archivos', archivo);
    formData.append('fecha', fecha);
    formData.append('titulo', titulo);
    return this.http.post<any>(this.apiUrl, formData);
  }
   obtenerHojaPorFecha(fecha: string): Observable<any> {
    const params = { fechaInicio: fecha, fechaFin: fecha };
    return this.http.get<any>(`${this.apiUrl}/por-fecha`, { params });
  }

  getArchivoUrl(nombreArchivo: string): string {
    return new URL(`uploads/hojas_dominical/${nombreArchivo}`, environment.apiBaseUrl).toString();
  }
}