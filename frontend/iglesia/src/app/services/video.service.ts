import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VideoService {
  private storageKey = 'videoUrls';

  getVideos(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : ['', '', '', ''];
  }

  setVideos(urls: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(urls));
  }
}