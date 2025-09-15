import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HojaDominicalService {
  private apiUrl = 'http://localhost:3000/api/hoja-dominical';

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
    return `http://localhost:3000/uploads/hojas_dominical/${nombreArchivo}`;
  }
}