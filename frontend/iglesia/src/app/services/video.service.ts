import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class VideoService {
  private http = inject(HttpClient);
  private apiUrl = new URL('api/videos', environment.apiBaseUrl).toString();

  getVideos(): Observable<string[]> {
    return this.http.get<ApiResponse<Array<{ enlace: string }>>>(this.apiUrl).pipe(
      map((response) =>
        (response.data ?? []).map((video) => video.enlace).filter((enlace) => !!enlace)
      )
    );
  }

  saveVideos(urls: string[]): Observable<string[]> {
    return this.http
      .post<ApiResponse<Array<{ enlace: string }>>>(`${this.apiUrl}/bulk`, { enlaces: urls })
      .pipe(
        map((response) =>
          (response.data ?? []).map((video) => video.enlace).filter((enlace) => !!enlace)
        )
      );
  }
}