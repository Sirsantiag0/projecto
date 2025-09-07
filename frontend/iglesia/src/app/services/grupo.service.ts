import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

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

  crearGrupo(descripcion: string): Observable<any> {
    return this.http.post<any>(this.gruposUrl, { descripcion });
  }

  subirArchivoGrupo(id_grupo: number, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id_grupo', id_grupo.toString());
    return this.http.post<any>(this.archivosUrl, formData);
  }

  obtenerArchivosPorGrupo(grupoId: number): Observable<any> {
    return this.http.get<any>(`${this.archivosUrl}/grupo/${grupoId}`);
  }
  
  crearGrupoConImagen(descripcion: string, archivo: File): Observable<any> {
    return this.crearGrupo(descripcion).pipe(
      switchMap(res => this.subirArchivoGrupo(res.data.id, archivo))
    );
  }
}