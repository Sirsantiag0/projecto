import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private archivosService = inject(ArchivosEventoService);

  imagenes = signal<string[]>([]);
  currentIndex = signal(0);

  ngOnInit() {
    this.archivosService.listarImagenes().subscribe(res => {
      const data = res.data || [];
      this.imagenes.set(
        data.map((img: any) => `http://localhost:3000/uploads/${img.ruta_archivos}`)
      );
      setInterval(() => {
        this.currentIndex.update(i =>
          this.imagenes().length ? (i + 1) % this.imagenes().length : 0
        );
      }, 5000);
    });
  }
}