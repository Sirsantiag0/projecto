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

  fechaSeleccionada = '';
  tituloPdf = '';
  rutaPdf: string | null = null;

  buscarHoja() {
    if (!this.fechaSeleccionada) {
         this.tituloPdf = '';
      this.rutaPdf = null;
      return;
    }

    this.hojaService.obtenerHojaPorFecha(this.fechaSeleccionada).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.tituloPdf = res.data.titulo;
          this.rutaPdf = `http://localhost:3000/uploads/hojas_dominical/${res.data.ruta_archivos}`;
        } else {
          this.tituloPdf = 'Hoja dominical no encontrada';
          this.rutaPdf = null;
        }
      },
      error: () => {
        this.tituloPdf = 'Hoja dominical no encontrada';
        this.rutaPdf = null;
      }
    });
  }

  descargarPdf() {
    if (!this.rutaPdf) {
      alert('Por favor selecciona una fecha con hoja disponible 📅');
      return;
    }

    const link = document.createElement('a');
    link.href = this.rutaPdf;
    link.download = this.tituloPdf || 'hoja-dominical.pdf';
    link.click();
  }
}
