import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private gruposUrl = 'http://localhost:3000/api/grupos';

  constructor(private http: HttpClient) {}

  listarGrupos(): Observable<any> {
    return this.http.get<any>(this.gruposUrl);
  }
  
    obtenerGrupo(id: number): Observable<any> {
    return this.http.get<any>(`${this.gruposUrl}/${id}`);
  }


  crearGrupo(titulo: string, descripcion: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);
    return this.http.post<any>(this.gruposUrl, formData);
  }

  obtenerArchivosPorGrupo(grupoId: number): Observable<any> {
    return this.http.get<any>(`${this.gruposUrl}/grupo/${grupoId}`);
  }

  
  actualizarGrupo(id: number, titulo: string, descripcion: string, archivo?: File): Observable<any> {
    if (archivo) {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('archivo', archivo);
      return this.http.put<any>(`${this.gruposUrl}/${id}`, formData);
    }
    return this.http.put<any>(`${this.gruposUrl}/${id}`, { titulo, descripcion, archivo });
  }

  eliminarGrupo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.gruposUrl}/${id}`);
  }
}