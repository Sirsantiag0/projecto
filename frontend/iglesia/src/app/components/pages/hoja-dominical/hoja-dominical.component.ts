import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hoja-dominical',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hoja-dominical.component.html',
  styleUrls: ['./hoja-dominical.component.css']
})
export class HojaDominicalComponent {
  fechaSeleccionada: string = '';
  tituloPdf: string = 'Hoja Dominical';

  descargarPdf() {
    if (!this.fechaSeleccionada) {
      alert('Por favor selecciona una fecha 📅');
      return;
    }

    // Simulación de descarga
    alert(`Descargando PDF de la fecha: ${this.fechaSeleccionada}`);
    // Aquí podrías llamar a tu backend para generar/descargar el PDF
  }
}
