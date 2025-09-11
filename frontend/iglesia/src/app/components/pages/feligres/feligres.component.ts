import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { forkJoin } from 'rxjs';
import { AsistenciaEventoService } from '../../../services/asistencia-evento.service';
import { AuthService } from '../../../services/auth.service';

// ---------------- Interfaces ----------------
interface Asistencia {
  id_evento: number;
}

interface Evento {
  id: number;
  fecha: string;
  hora: string;
  descripcion: string;
}

@Component({
  selector: 'app-feligres',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './feligres.component.html',
  styleUrls: ['./feligres.component.css']
})
export class FeligresComponent implements OnInit {
  private asistenciaEventoService = inject(AsistenciaEventoService);
  private authService = inject(AuthService);

  eventos = signal<Evento[]>([]);

  ngOnInit(): void {
    const user = this.authService.user();
    if (user?.id_feligres) {
      this.asistenciaEventoService
        .obtenerAsistenciasPorFeligres(user.id_feligres)
        .subscribe((res: { data: Asistencia[] }) => {
          const asistencias = res.data || [];

          const requests = asistencias.map((a: Asistencia) =>
            this.asistenciaEventoService.obtenerEvento(a.id_evento)
          );

          if (requests.length) {
            forkJoin(requests).subscribe((eventRes: { data: Evento }[]) => {
              const eventos = eventRes.map(e => e.data);
              this.eventos.set(eventos);
            });
          }
        });
    }
  }
}
