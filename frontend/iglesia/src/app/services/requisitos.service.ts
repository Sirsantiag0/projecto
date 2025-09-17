import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly apiUrl = 'http://localhost:3000/api/requisitos';

  constructor(private http: HttpClient) {}

  crearRequisito(id_servicio: number, requisito: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_servicio, requisito });
  }
}