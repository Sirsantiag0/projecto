import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { VideoService } from '../../../services/video.service';
import { TituloEventoService } from '../../../services/titulo-evento.service';
import { AsistenciaEventoService, Evento } from '../../../services/asistencia-evento.service';

@Component({
  selector: 'app-asistente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css']
})
export class AsistenteComponent implements OnInit {
  private archivosService = inject(ArchivosEventoService);
  private videoService = inject(VideoService);
  private tituloService = inject(TituloEventoService);
  private eventosService = inject(AsistenciaEventoService);

  // -------- Imágenes --------
  detalle = '';
  archivo?: File;
  imagenes: any[] = [];

  // -------- Videos --------
  videoUrls: string[] = ['', '', '', ''];

  // -------- Títulos --------
  eventTitles: string[] = ['', '', '', ''];

  // -------- Eventos --------
  eventos: Evento[] = [];
  nuevoEvento: Evento = { fecha: '', hora: '', descripcion: '' };
  editingId: number | null = null;

  ngOnInit(): void {
    this.cargarImagenes();
    this.videoUrls = this.videoService.getVideos();
    this.eventTitles = this.tituloService.getTitles();
    this.cargarEventos();
  }

  // ---------------- Imágenes ----------------
  cargarImagenes() {
    this.archivosService.listarImagenes().subscribe((res) => {
      this.imagenes = res.data;
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivo = target.files[0];
    }
  }

  subirImagen() {
    if (!this.archivo) return;

    this.archivosService.subirArchivo(this.archivo, this.detalle).subscribe(() => {
      this.detalle = '';
      this.archivo = undefined;
      this.cargarImagenes();
      alert('Imagen subida correctamente');
    });
  }

  eliminarImagen(id: number) {
    this.archivosService.eliminarArchivo(id).subscribe(() => {
      this.cargarImagenes();
      alert('Imagen eliminada correctamente');
    });
  }

  reemplazarImagen(img: any, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const archivoNuevo = target.files[0];
      this.archivosService.reemplazarArchivo(img.id, archivoNuevo, img.detalle).subscribe(() => {
        this.cargarImagenes();
        alert('Imagen reemplazada correctamente');
      });
    }
  }

  // ---------------- Videos ----------------
  guardarVideos() {
    const embeds = this.videoUrls.map((url) => this.toEmbed(url));
    this.videoService.setVideos(embeds);
    this.videoUrls = embeds;
    alert('Videos guardados correctamente');
  }

  // ---------------- Títulos ----------------
  guardarTitulos() {
    this.tituloService.setTitles(this.eventTitles);
    alert('Títulos guardados correctamente');
  }

  // ---------------- Eventos ----------------
  guardarEvento() {
    if (this.editingId) {
      this.eventosService.actualizarEvento(this.editingId, this.nuevoEvento).subscribe(() => {
        this.cargarEventos();
        this.editingId = null;
        this.nuevoEvento = { fecha: '', hora: '', descripcion: '' };
      });
    } else {
      this.eventosService.crearEvento(this.nuevoEvento).subscribe(() => {
        this.cargarEventos();
        this.nuevoEvento = { fecha: '', hora: '', descripcion: '' };
      });
    }
  }

  editarEvento(ev: Evento) {
    this.nuevoEvento = { fecha: ev.fecha, hora: ev.hora, descripcion: ev.descripcion };
    this.editingId = ev.id!;
  }

  eliminarEvento(id: number) {
    this.eventosService.eliminarEvento(id).subscribe(() => {
      this.cargarEventos();
    });
  }

  cargarEventos() {
    this.eventosService.listarEventos().subscribe(res => {
      this.eventos = res.data;
    });
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  trackByIndex(index: number) {
    return index;
  }

  // ---------------- Helper YouTube ----------------
  private toEmbed(url: string): string {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/)([A-Za-z0-9_-]{11})/);
    const id = match ? match[1] : url;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
  }
}
