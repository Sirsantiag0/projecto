import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { VideoService } from '../../../services/video.service';
import { AsistenciaEventoService, Evento } from '../../../services/asistencia-evento.service';
import { GruposService } from '../../../services/grupo.service';
import { HojaDominicalService } from '../../../services/hoja-dominical.service';
import { ServiciosService, Servicio } from '../../../services/servicios.service';
import { RequisitosService } from '../../../services/requisitos.service';

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
  private eventosService = inject(AsistenciaEventoService);
  private gruposService = inject(GruposService);
  private hojaService = inject(HojaDominicalService);
  private serviciosService = inject(ServiciosService);
  private requisitosService = inject(RequisitosService);

  // -------- Imágenes --------
  detalle = '';
  titulo = ''; // Nuevo campo
  archivo?: File;
  imagenes: any[] = [];

  // -------- Videos --------
  videoUrls: string[] = ['', '', '', ''];

  // -------- Eventos --------
  eventos: Evento[] = [];
  nuevoEvento: Evento = { fecha: '', hora: '', descripcion: '' };
  editingId: number | null = null;

    // -------- Grupos --------
  grupos: any[] = [];
  grupoDescripcion = '';
  grupoArchivo?: File;
  grupoEditingId: number | null = null;

  // -------- Hoja dominical --------
  hojaArchivo?: File;
  hojaFecha = '';
  hojaTitulo = '';

    // -------- Servicios --------
  servicios: Servicio[] = [];
  servicioDescripcion = '';
    servicioSeleccionadoId: number | null = null;
  requisitoDescripcion = '';


  ngOnInit(): void {
    this.cargarImagenes();
    this.cargarVideos();
    this.cargarEventos();
    this.cargarGrupos();
    this.cargarServicios();
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
    const embeds = this.videoUrls
      .map((url) => (url ? this.toEmbed(url) : ''))
      .filter((url) => url.length > 0);

    this.videoService.saveVideos(embeds).subscribe({
      next: (saved) => {
        this.videoUrls = this.fillVideoSlots(saved);
        alert('Videos guardados correctamente');
      },
      error: (error) => {
        console.error('Error al guardar videos', error);
        alert('No se pudieron guardar los videos');
      }
    });
  }

  private cargarVideos() {
    this.videoService.getVideos().subscribe({
      next: (urls) => {
        this.videoUrls = this.fillVideoSlots(urls);
      },
      error: (error) => {
        console.error('Error al cargar videos', error);
        this.videoUrls = this.fillVideoSlots([]);
      }
    });
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

    // ---------------- Grupos ---------------- // grupos
  cargarGrupos() {
    this.gruposService.listarGrupos().subscribe(res => {
       this.grupos = res.data.map((g: any) => ({
        ...g,
        imagen: g.ruta_archivo
      }));
    });
  }

  onGrupoFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.grupoArchivo = target.files[0];
    }
  }

    agregarGrupo() {
    if (!this.grupoDescripcion || !this.titulo) {
      window.alert('Todos los campos son obligatorios');
      return;
    }


    if (this.grupoEditingId) {
      this.gruposService
        .actualizarGrupo(this.grupoEditingId, this.titulo, this.grupoDescripcion, this.grupoArchivo)
        .subscribe(() => {
          this.resetGrupoForm();
          this.cargarGrupos();
          alert('Grupo actualizado correctamente');
        });
    } else {
      if (!this.grupoArchivo) {
        return;
      }
      this.gruposService
        .crearGrupo(this.titulo, this.grupoDescripcion, this.grupoArchivo)
        .subscribe(() => {
          this.resetGrupoForm();
          window.alert('Grupo agregado correctamente');
          this.cargarGrupos();
        });
    }
  }

  editarGrupo(grupo: any) {
    this.grupoEditingId = grupo.id;
    this.titulo = grupo.titulo;
    this.grupoDescripcion = grupo.descripcion;
    this.grupoArchivo = undefined;
  }

  eliminarGrupo(id: number) {
    this.gruposService.eliminarGrupo(id).subscribe(() => {
      this.cargarGrupos();
    });
  }

  private resetGrupoForm() {
    this.titulo = '';
    this.grupoDescripcion = '';
    this.grupoArchivo = undefined;
    this.grupoEditingId = null;
  }

    // ---------------- Hoja dominical ----------------
  onHojaFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.hojaArchivo = target.files[0];
    }
  }

  subirHojaDominical() {
    if (!this.hojaArchivo || !this.hojaFecha || !this.hojaTitulo) {
      window.alert('Todos los campos son obligatorios');
      return;
    }

    this.hojaService
      .crearHojaDominical(this.hojaArchivo, this.hojaFecha, this.hojaTitulo)
      .subscribe(() => {
        this.resetHojaForm();
        alert('Hoja dominical subida correctamente');
      });
  }

  private resetHojaForm() {
    this.hojaArchivo = undefined;
    this.hojaFecha = '';
    this.hojaTitulo = '';
  }

    // ---------------- Servicios ----------------
  cargarServicios() {
    this.serviciosService.listarServicios().subscribe({
      next: (res) => {
        this.servicios = res.data ?? [];
      },
      error: (error) => {
        console.error('Error al cargar servicios', error);
        this.servicios = [];
      }
    });
  }

  subirServicio() {
    const descripcion = this.servicioDescripcion.trim();
    if (!descripcion) {
      window.alert('La descripción del servicio es obligatoria');
      return;
    }

    this.serviciosService.crearServicio(descripcion).subscribe({
      next: () => {
        this.servicioDescripcion = '';
        this.cargarServicios();
        alert('Servicio guardado correctamente');
      },
      error: (error) => {
        console.error('Error al crear servicio', error);
        window.alert('No se pudo guardar el servicio');
      }
    });
  }

    eliminarServicio(servicio: Servicio) {
    const servicioId = servicio.id;
    if (!servicioId) {
      return;
    }

    const confirmar = window.confirm(
      `¿Deseas eliminar el servicio "${servicio.descripcion}"? Esta acción también eliminará todos sus requisitos.`
    );

    if (!confirmar) {
      return;
    }

    this.serviciosService.eliminarServicio(servicioId).subscribe({
      next: () => {
        if (this.servicioSeleccionadoId === servicioId) {
          this.servicioSeleccionadoId = null;
          this.requisitoDescripcion = '';
        }
        this.cargarServicios();
        alert('Servicio eliminado correctamente');
      },
      error: (error) => {
        console.error('Error al eliminar servicio', error);
        window.alert('No se pudo eliminar el servicio');
      }
    });
  }

    agregarRequisito() {
    const servicioId = this.servicioSeleccionadoId;
    const requisito = this.requisitoDescripcion.trim();

    if (!servicioId) {
      window.alert('Selecciona un servicio para continuar');
      return;
    }

    if (!requisito) {
      window.alert('El requisito es obligatorio');
      return;
    }

    this.requisitosService.crearRequisito(servicioId, requisito).subscribe({
      next: () => {
        this.requisitoDescripcion = '';
        this.servicioSeleccionadoId = null;
        this.cargarServicios();
        alert('Requisito guardado correctamente');
      },
      error: (error) => {
        console.error('Error al guardar requisito', error);
        window.alert('No se pudo guardar el requisito');
      }
    });
  }


  trackById(index: number, item: any) {
    return item.id;
  }


  // ---------------- Helper YouTube ----------------
  private toEmbed(url: string): string {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/)([A-Za-z0-9_-]{11})/);
    const id = match ? match[1] : url;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
  }

  private fillVideoSlots(urls: string[]): string[] {
    const filled = [...urls];
    while (filled.length < 4) {
      filled.push('');
    }
    return filled.slice(0, 4);
  }
}
