import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicio, ServiciosService } from '../../../services/servicios.service';

type ServicioConRequisitos = Servicio & {
  requisitos?: string[] | string | null;
};

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiciosComponent implements OnInit {
  private readonly serviciosService = inject(ServiciosService);

  protected readonly servicios = signal<ServicioConRequisitos[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal<string | null>(null);
  private readonly expandedIndex = signal<number | null>(null);

  ngOnInit(): void {
    this.serviciosService.listarServicios().subscribe({
      next: (response) => {
        const data = (response?.data ?? []) as ServicioConRequisitos[];
        this.servicios.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los servicios. Intenta nuevamente más tarde.');
        this.isLoading.set(false);
      },
    });
  }

  protected toggleServicio(index: number): void {
    this.expandedIndex.update((current) => (current === index ? null : index));
  }

  protected isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  protected trackByServicio(index: number, servicio: ServicioConRequisitos): number | string {
    return servicio.id ?? servicio.descripcion ?? index;
  }

  protected trackByRequisito(index: number, requisito: string): string {
    return requisito || String(index);
  }

  protected obtenerRequisitos(servicio: ServicioConRequisitos): string[] {
    const requisitos = servicio.requisitos;
    if (Array.isArray(requisitos)) {
      return requisitos.map((r) => r.trim()).filter((r) => !!r);
    }
    if (typeof requisitos === 'string') {
      return requisitos
        .split(/\r?\n|,/) // permite separar por saltos de línea o comas
        .map((item) => item.trim())
        .filter((item) => !!item);
    }
    return [];
  }
}