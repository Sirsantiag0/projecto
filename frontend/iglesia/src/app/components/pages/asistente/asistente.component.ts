import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { VideoService } from '../../../services/video.service';

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

  detalle = '';
  archivo?: File;
  imagenes: any[] = [];
  videoUrls: string[] = ['', '', '', ''];

  ngOnInit() {
    this.cargarImagenes();
     this.videoUrls = this.videoService.getVideos();
  }

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
    if (!this.archivo) {
      return;
    }
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
  
  guardarVideos() {
    const embeds = this.videoUrls.map((url) => this.toEmbed(url));
    this.videoService.setVideos(embeds);
    this.videoUrls = embeds;
    alert('Videos guardados correctamente');
  }

  private toEmbed(url: string): string {
    if (!url) {
      return '';
    }
    const match = url.match(/(?:v=|\.be\/)([^&]+)/);
    const id = match ? match[1] : url;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
  }
}
