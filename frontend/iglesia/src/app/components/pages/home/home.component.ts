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
  private touchStartX: number | null = null;

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
      const urls = data
        .map((img: any) =>
          img.url || (img.ruta_archivos
            ? new URL(`uploads/${img.ruta_archivos}`, environment.apiBaseUrl).toString()
            : null)
        )
        .filter((value: string | null): value is string => value !== null);
      this.imagenes.set(urls);
      setInterval(() => {
        this.nextSlide();
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

  previousSlide(): void {
    const total = this.carouselImages().length;
    if (!total) {
      return;
    }
    this.currentIndex.update((i) => (i - 1 + total) % total);
  }

  nextSlide(): void {
    const total = this.carouselImages().length;
    if (!total) {
      return;
    }
    this.currentIndex.update((i) => (i + 1) % total);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX === null) {
      return;
    }
    const endX = event.changedTouches[0]?.clientX ?? this.touchStartX;
    const deltaX = this.touchStartX - endX;
    const swipeThreshold = 30;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }

    this.touchStartX = null;
  }
}