import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaEventoService, Evento } from '../../../services/asistencia-evento.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'] 
})
export class CalendarioComponent implements OnInit {
  currentDate = new Date();
  monthDays: { day: number, fullDate: string }[] = [];
  monthName: string = '';
  year: number = 0;
  listEventos: Evento[] = [];
  isMobile = false;
  participatedEventIds = new Set<number>();
  eventos: Evento[] = [
    {
      fecha: '2025-08-05',
      hora: '10:00',
      descripcion: 'Reunión de equipo'
    },
    {
      fecha: '2025-08-10',
      hora: '14:00',
      descripcion: 'Taller Angular'
    }
  ];

  constructor(
    private eventosService: AsistenciaEventoService,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.generarSemana(this.currentDate);
      } else {
        this.generarCalendario(this.currentDate.getMonth(), this.currentDate.getFullYear());
      }
    });

    this.searchEvento();
    this.loadParticipations();
  }
  
  searchEvento() {
    this.eventosService.listarEventos().subscribe(
      (data: any) => {
        this.listEventos = data.data;
        console.log('Eventos obtenidos:', this.listEventos);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener medics:', error);
      }
    );
  }

  loadParticipations() {
    const user = this.authService.user();
    if (user?.id_feligres) {
      this.eventosService
        .obtenerAsistenciasPorFeligres(user.id_feligres)
        .subscribe((res: { data: { id_evento: number }[] }) => {
          const asistencias = res.data || [];
          asistencias.forEach(a => this.participatedEventIds.add(a.id_evento));
          this.cdr.detectChanges();
        });
    }
  }

  generarCalendario(month: number, year: number) {
    this.monthDays = [];
    this.monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
    this.year = year;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      this.monthDays.push({ day: 0, fullDate: '' });
    }

    for (let day = 1; day <= totalDays; day++) {
      const fecha = new Date(year, month, day);
      const fullDate = fecha.toISOString().split('T')[0];
      this.monthDays.push({ day, fullDate });
    }
  }

  generarSemana(date: Date) {
    this.monthDays = [];
    const dayOfWeek = date.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const fullDate = d.toISOString().split('T')[0];
      this.monthDays.push({ day: d.getDate(), fullDate });
    }

    this.monthName = new Intl.DateTimeFormat('default', { month: 'long' }).format(date);
    this.year = date.getFullYear();
  }

  getEventosPorDia(fecha: string) {
    return this.listEventos.filter(e => {
      const eventoFecha = new Date(e.fecha).toISOString().split('T')[0];
      return eventoFecha === fecha;
    });
  }

  // MÉTODO PARA OBTENER EL NOMBRE COMPLETO DEL DÍA (Móvil)
  getDiaSemanaNombre(fullDate: string): string {
    if (!fullDate) return '';
    const date = new Date(fullDate);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[date.getDay()];
  }

  // MÉTODO PARA OBTENER LA ABREVIATURA DEL DÍA (Desktop)
  getDiaSemana(fullDate: string): string {
    if (!fullDate) return '';
    const date = new Date(fullDate);
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return dias[date.getDay()];
  }

  cambiarMes(offset: number) {
    if (this.isMobile) {
      const newDate = new Date(this.currentDate);
      newDate.setDate(this.currentDate.getDate() + (offset * 7));
      this.currentDate = newDate;
      this.generarSemana(newDate);
    } else {
      const newDate = new Date(this.year, this.currentDate.getMonth() + offset, 1);
      this.currentDate = newDate;
      this.generarCalendario(newDate.getMonth(), newDate.getFullYear());
    }
  }

  marcarAsistencia(evento: Evento) {
    const user = this.authService.user();
    if (!user || !user.id_feligres || !evento.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso requerido',
        text: 'Debes iniciar sesión para marcar asistencia.',
        confirmButtonText: 'Aceptar',
        position: 'center'
      });
      return;
    }

    this.eventosService.registrarAsistencia({
      id_evento: evento.id,
      id_feligres: user.id_feligres
    }).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Asistencia registrada',
          text: `Asistencia marcada para: ${evento.descripcion} a las ${evento.hora}, te esperamos⛪`,
          confirmButtonText: 'Aceptar',
          position: 'center'
        });
        if (evento.id) {
          this.participatedEventIds.add(evento.id);
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Error al registrar asistencia:', error);
      }
    );
  }

  haParticipado(evento: Evento) {
    return !!evento.id && this.participatedEventIds.has(evento.id);
  }
}