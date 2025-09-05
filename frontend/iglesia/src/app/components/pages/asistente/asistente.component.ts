import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { VideoService } from '../../../services/video.service';
import { TituloEventoService } from '../../../services/titulo-evento.service';

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

  // -------- Imágenes --------
  detalle = '';
  archivo?: File;
  imagenes: any[] = [];

  // -------- Videos --------
  videoUrls: string[] = ['', '', '', ''];

  // -------- Títulos --------
  eventTitles: string[] = ['', '', '', ''];

  // -------- Eventos --------
  eventos: any[] = [];
  nuevoEvento: any = { fecha: '', hora: '', descripcion: '' };
  editingId: number | null = null;

  ngOnInit(): void {
    this.cargarImagenes();
    this.videoUrls = this.videoService.getVideos();
    this.eventTitles = this.tituloService.getTitles();

    // opcional: podrías guardar eventos en localStorage también
    const eventosGuardados = localStorage.getItem('eventos');
    if (eventosGuardados) {
      this.eventos = JSON.parse(eventosGuardados);
    }
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
      // Actualizar
      const idx = this.eventos.findIndex(ev => ev.id === this.editingId);
      if (idx > -1) {
        this.eventos[idx] = { ...this.nuevoEvento, id: this.editingId };
      }
      this.editingId = null;
    } else {
      // Nuevo
      const nuevo = { ...this.nuevoEvento, id: Date.now() };
      this.eventos.push(nuevo);
    }

    this.nuevoEvento = { fecha: '', hora: '', descripcion: '' };
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
  }

  editarEvento(ev: any) {
    this.nuevoEvento = { ...ev };
    this.editingId = ev.id;
  }

  eliminarEvento(id: number) {
    this.eventos = this.eventos.filter(ev => ev.id !== id);
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
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
