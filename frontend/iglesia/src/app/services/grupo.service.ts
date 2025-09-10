import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private gruposUrl = 'http://localhost:3000/api/grupos';
  private archivosUrl = 'http://localhost:3000/api/archivos-grupo';

  constructor(private http: HttpClient) {}

  listarGrupos(): Observable<any> {
    return this.http.get<any>(this.gruposUrl);
  }

  crearGrupo(titulo: string, descripcion: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);
    return this.http.post<any>(this.gruposUrl, formData);
  }

  obtenerArchivosPorGrupo(grupoId: number): Observable<any> {
    return this.http.get<any>(`${this.archivosUrl}/grupo/${grupoId}`);
  }

  
  actualizarGrupo(id: number, titulo: string, descripcion: string): Observable<any> {
    return this.http.put<any>(`${this.gruposUrl}/${id}`, { titulo, descripcion});
  }

  eliminarGrupo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.gruposUrl}/${id}`);
  }
}