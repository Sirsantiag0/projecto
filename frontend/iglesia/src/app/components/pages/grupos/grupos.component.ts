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
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.gruposService.listarGrupos().subscribe(res => {
      this.grupos = res.data;
      this.grupos.forEach(g => {
        this.gruposService.obtenerArchivosPorGrupo(g.id).subscribe(ar => {
          g.imagen = ar.data[0]?.ruta_archivos;
        });
      });
    });
  }

  getImagen(grupo: any): string {
    return grupo.imagen ? `http://localhost:3000/uploads/grupos/${grupo.imagen}` : '';
  }

}
