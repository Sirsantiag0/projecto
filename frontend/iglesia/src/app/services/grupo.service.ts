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

  subirArchivoGrupo(titulo: string, descripcion:string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);
    return this.http.post<any>(this.archivosUrl, formData);
  }

  obtenerArchivosPorGrupo(grupoId: number): Observable<any> {
    return this.http.get<any>(`${this.archivosUrl}/grupo/${grupoId}`);
  }
  

}