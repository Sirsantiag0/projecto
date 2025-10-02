import { ChangeDetectionStrategy, Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { VideoService } from '../../../services/video.service';
import { AsistenciaEventoService, Evento } from '../../../services/asistencia-evento.service';
import { environment } from '../../../../environments/environment';

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
  private videoService = inject(VideoService);
  private sanitizer = inject(DomSanitizer);
  private eventosService = inject(AsistenciaEventoService);

  imagenes = signal<string[]>([]);
  carouselImages = computed(() => this.imagenes().slice(6,10));
  featuredImages = computed(() => this.imagenes().slice(-4));
  eventos = signal<Evento[]>([]);
  featuredEvents = computed(() =>
    this.eventos()
      .filter(e => new Date(e.fecha) > new Date())
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, 4)
  );
  currentIndex = signal(0);
  videoUrls: SafeResourceUrl[] = [];


  ngOnInit() {
      this.archivosService.listarImagenes().subscribe(res => {
      const data = res.data || [];
      this.imagenes.set(
        data.map((img: any) =>
          new URL(`uploads/${img.ruta_archivos}`, environment.apiBaseUrl).toString()
        )
      );
      setInterval(() => {
        this.currentIndex.update(i =>
          this.carouselImages().length ? (i + 1) % this.carouselImages().length : 0
        );
      }, 5000);
    });
    this.videoService
      .getVideos()
      .subscribe({
        next: (videos) => {
          this.videoUrls = videos
            .filter((v) => !!v)
            .map((v) => this.sanitizer.bypassSecurityTrustResourceUrl(v));
        },
        error: (error) => {
          console.error('Error al cargar videos', error);
          this.videoUrls = [];
        }
      });
    this.eventosService.listarEventos().subscribe(res => {
      const data = res.data || [];
      this.eventos.set(data);
    });
  }
}