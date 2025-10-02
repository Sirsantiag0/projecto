import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Requisito {
  id?: number;
  id_servicio: number;
  requisito: string;
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RequisitosService {
  private readonly apiUrl = new URL('api/requisitos', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {}

  crearRequisito(id_servicio: number, requisito: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_servicio, requisito });
  }
}