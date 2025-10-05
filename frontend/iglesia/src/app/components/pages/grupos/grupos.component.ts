import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../../services/grupo.service';
import { AuthService } from '../../../services/auth.service';
import { SuscripcionGrupoService } from '../../../services/suscripcion-grupo.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GruposComponent implements OnInit {
  private gruposService = inject(GruposService);
  private authService = inject(AuthService);
  private suscripcionService = inject(SuscripcionGrupoService);
  grupos = signal<any[]>([]);
  selectedGrupo = signal<any | null>(null);
  suscripciones = signal<number[]>([]);

  ngOnInit(): void {
    this.gruposService.listarGrupos().subscribe(res => {
      const data = res.data || [];
      this.grupos.set(
        data.map((g: any) => ({
          ...g,
          imagen: g.imagenUrl || (g.ruta_archivo ? new URL(`uploads/grupos/${g.ruta_archivo}`, environment.apiBaseUrl).toString() : null)
        }))
      );
    });
    
    const user = this.authService.user();
    if (user?.id_feligres) {
      this.suscripcionService
        .obtenerSuscripcionesPorFeligres(user.id_feligres)
        .subscribe(res => {
          const data = res.data || [];
          this.suscripciones.set(data.map((s: any) => s.id_grupo));
        });
    }
  }
  
  openModal(grupo: any) {
    this.selectedGrupo.set(grupo);
  }

  closeModal() {
    this.selectedGrupo.set(null);
  }
  
  ingresar() {
        const user = this.authService.user();
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso requerido',
        text: 'Debes iniciar sesión para solicitar ingreso.',
        confirmButtonText: 'Aceptar',
        position: 'center'
      });
            return;
    }

    const id_feligres = user.id_feligres;
    const id_grupo = this.selectedGrupo()?.id;

    if (id_feligres && id_grupo) {
      this.suscripcionService.suscribir(id_feligres, id_grupo).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Suscripción exitosa',
            text: 'Ya estás suscrito exitosamente.',
            confirmButtonText: 'Aceptar',
            position: 'center'
          });
                    this.suscripciones.update(current =>
            current.includes(id_grupo) ? current : [...current, id_grupo]
          );
          this.closeModal();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo completar la suscripción.',
            confirmButtonText: 'Aceptar',
            position: 'center'
          });
        }
      });
    }
  }
  estaSuscrito(grupoId: number | null | undefined): boolean {
    if (!grupoId) {
      return false;
    }
    return this.suscripciones().includes(grupoId);
  }
} 