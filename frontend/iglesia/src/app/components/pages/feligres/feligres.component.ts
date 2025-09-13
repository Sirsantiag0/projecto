import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin } from 'rxjs';
import { AsistenciaEventoService } from '../../../services/asistencia-evento.service';
import { AuthService } from '../../../services/auth.service';
import { SuscripcionGrupoService } from '../../../services/suscripcion-grupo.service';
import { GruposService } from '../../../services/grupo.service';

// ---------------- Interfaces ----------------
interface Asistencia {
    id: number;
  id_evento: number;
}

interface Evento {
  id: number;
  fecha: string;
  hora: string;
  descripcion: string;
  asistenciaId: number;
}

interface Suscripcion {
  id_grupo: number;
}

interface Grupo {
  id: number;
  titulo: string;
  ruta_archivo: string | null;
}


@Component({
  selector: 'app-feligres',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './feligres.component.html',
  styleUrls: ['./feligres.component.css']
})
export class FeligresComponent implements OnInit {
  private asistenciaEventoService = inject(AsistenciaEventoService);
  public authService = inject(AuthService);
  private suscripcionGrupoService = inject(SuscripcionGrupoService);
  private gruposService = inject(GruposService);

  eventos = signal<Evento[]>([]);
  grupos = signal<Grupo[]>([]);

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
                           const eventos = eventRes.map((e, index) => ({
                ...e.data,
                asistenciaId: asistencias[index].id,
              }));
              this.eventos.set(eventos);
            });
          }
        });
        
      this.suscripcionGrupoService
        .obtenerSuscripcionesPorFeligres(user.id_feligres)
        .subscribe((res: { data: Suscripcion[] }) => {
          const subs = res.data || [];
          const requests = subs.map((s: Suscripcion) =>
            this.gruposService.obtenerGrupo(s.id_grupo)
          );

          if (requests.length) {
            forkJoin(requests).subscribe((grupoRes: { data: Grupo }[]) => {
              const grupos = grupoRes.map(g => g.data);
              this.grupos.set(grupos);
            });
          }
        });
    }
  }
  
  eliminarAsistencia(asistenciaId: number): void {
    this.asistenciaEventoService.eliminarAsistencia(asistenciaId).subscribe(() => {
      this.eventos.update(eventos => eventos.filter(e => e.asistenciaId !== asistenciaId));
    });
  }
}
