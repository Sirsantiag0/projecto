import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  correo: string;
  id_rol: number | null;
  rol: string | null;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  readonly user = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  login(correo: string, password: string) {
    return this.http.post<LoginResponse>(this.apiUrl, { correo, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.user.set(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}