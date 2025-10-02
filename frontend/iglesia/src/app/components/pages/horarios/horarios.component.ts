import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  private archivosService = inject(ArchivosEventoService);
  imagenes = signal<string[]>([]);
  scheduleImages = computed(() => this.imagenes().slice(0, 6));

  ngOnInit() {
    this.archivosService.listarImagenes().subscribe((res) => {
      const data = res.data || [];
      this.imagenes.set(
        data.map((img: any) =>
          new URL(`uploads/${img.ruta_archivos}`, environment.apiBaseUrl).toString()
        )
      );
    });
  }
}