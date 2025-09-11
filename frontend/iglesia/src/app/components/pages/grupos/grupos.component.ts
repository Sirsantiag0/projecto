import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../../services/grupo.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  private gruposService = inject(GruposService);
  grupos: any[] = [];

  ngOnInit(): void {
    this.gruposService.listarGrupos().subscribe(res => {
      this.grupos = res.data.map((g: any) => ({
        ...g,
        imagen: g.ruta_archivo
      }));
    });
  }
}