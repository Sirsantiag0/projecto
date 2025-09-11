import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../../services/grupo.service';

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
   grupos = signal<any[]>([]);

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
}