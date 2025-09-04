import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TituloEventoService {
  private storageKey = 'eventTitles';

  getTitles(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : ['', '', '', ''];
  }

  setTitles(titles: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(titles));
  }
}