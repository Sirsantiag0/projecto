import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donar.component.html',
  styleUrls: ['./donar.component.css']
})
export class DonarComponent {
  cuentas = [
    {
      numero: '147749-8',
      banco: 'Pacífico',
      ruc: '0992214694001',
      link: 'https://www.bancodelpacifico.com'
    },
    {
      numero: '3458912004',
      banco: 'Pichincha',
      ruc: '0992214694001',
      link: 'https://www.pichincha.com'
    }
  ];

  copiar(texto: string) {
    navigator.clipboard.writeText(texto);
  }
}
