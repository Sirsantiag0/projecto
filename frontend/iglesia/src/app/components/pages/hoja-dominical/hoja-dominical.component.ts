import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HojaDominicalService } from '../../../services/hoja-dominical.service';

@Component({
  selector: 'app-hoja-dominical',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hoja-dominical.component.html',
  styleUrls: ['./hoja-dominical.component.css']
})
export class HojaDominicalComponent {
  private hojaService = inject(HojaDominicalService);

  fechaSeleccionada: string = '';
  hojaSeleccionada?: any;
  tituloPdf: string = 'TITULO DEL PDF';

  buscarHoja() {
    if (!this.fechaSeleccionada) {
      this.hojaSeleccionada = undefined;
      this.tituloPdf = 'TITULO DEL PDF';
      return;
    }

    this.hojaService.obtenerHojaPorFecha(this.fechaSeleccionada).subscribe({
      next: (res) => {
        this.hojaSeleccionada = res.data[0];
        this.tituloPdf = this.hojaSeleccionada
          ? this.hojaSeleccionada.titulo
          : 'No hay hoja dominical para esta fecha';
      },
      error: () => {
        this.hojaSeleccionada = undefined;
        this.tituloPdf = 'No hay hoja dominical para esta fecha';
      }
    });
  }

  descargarPdf() {
    if (!this.hojaSeleccionada) {
      alert('No hay hoja dominical para la fecha seleccionada');
      return;
    }

    const url = this.hojaService.getArchivoUrl(
      this.hojaSeleccionada.ruta_archivos
    );
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = this.hojaSeleccionada.titulo || 'hoja-dominical';
    link.click();
  }
}