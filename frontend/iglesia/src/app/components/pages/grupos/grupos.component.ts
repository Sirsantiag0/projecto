import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../../services/grupo.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

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
  grupos = signal<any[]>([]);
  selectedGrupo = signal<any | null>(null);

  ngOnInit(): void {
    this.gruposService.listarGrupos().subscribe(res => {
      const data = res.data || [];
      this.grupos.set(
        data.map((g: any) => ({
          ...g,
          imagen: g.ruta_archivo
        }))
      );
    });
  }
  
  openModal(grupo: any) {
    this.selectedGrupo.set(grupo);
  }

  closeModal() {
    this.selectedGrupo.set(null);
  }
  
  ingresar() {
    if (!this.authService.user()) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso requerido',
        text: 'Debes iniciar sesión para solicitar ingreso.',
        confirmButtonText: 'Aceptar',
        position: 'center'
      });
    }
  }
}