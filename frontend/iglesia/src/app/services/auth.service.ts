import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  correo: string;
  id_rol: number | null;
  rol: string | null;
  id_feligres: number | null;
  nombres?: string | null;
  apellidos?: string | null;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  readonly user = signal<User | null>(null);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    }
  }

  login(correo: string, password: string) {
    return this.http.post<LoginResponse>(this.apiUrl, { correo, password }).pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.user.set(res.user);
        })
      );
    }
    logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}