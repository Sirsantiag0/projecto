import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaEventoService } from '../../../services/asistencia-evento.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'] 
})
export class CalendarioComponent implements  OnInit {
  currentDate = new Date(); 
  monthDays: { day: number, fullDate: string }[] = [];
  monthName: string = '';
  year: number = 0;
  listEventos: any[] = [];  
  eventos = [
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
  constructor(private eventosService: AsistenciaEventoService) {
  }

  ngOnInit() {
    this.generarCalendario(this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.searchEvento();
  }
  searchEvento() {

    this.eventosService.listarEventos().subscribe(
      (data: any) => {
        this.listEventos = data.data;
        console.log("Eventos obtenidos:", this.listEventos);
      },
      (error) => {
        console.error("Error al obtener medics:", error);
      }
    );
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

  getEventosPorDia(fecha: string) {
    return this.listEventos.filter(e => {
    const eventoFecha = new Date(e.fecha).toISOString().split('T')[0];
    return eventoFecha === fecha;
  });
  }

  cambiarMes(offset: number) {
    const newDate = new Date(this.year, this.currentDate.getMonth() + offset, 1);
    this.currentDate = newDate;
    this.generarCalendario(newDate.getMonth(), newDate.getFullYear());
  }

  marcarAsistencia(evento: any) {
    alert(`Asistencia marcada para: ${evento.id} ${evento.descripcion} a las ${evento.hora}`);
  }
}