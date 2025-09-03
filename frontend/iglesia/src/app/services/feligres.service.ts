import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeligresService {
  private apiUrl = 'http://localhost:3000/api/feligres';

  constructor(private http: HttpClient) {}

  crearFeligres(feligres: any): Observable<any> {
    return this.http.post(this.apiUrl, feligres);
  }
}