import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FeligresService } from '../../../services/feligres.service';

@Component({
  selector: 'app-administrador',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit {
  feligreses: any[] = [];
  nuevoFeligres = {
    cedula: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    edad: '',
    genero: '',
    direccion: '',
    email: '',
    telefono: '',
    password: '',
    id_rol: 3
  };
  editFeligresId: number | null = null;
  editFeligres: any = {};

  constructor(private feligresService: FeligresService) {}

  ngOnInit(): void {
    this.cargarFeligreses();
  }

  cargarFeligreses() {
    forkJoin({
      feligreses: this.feligresService.listarFeligreses(),
      usuarios: this.feligresService.listarUsuarios()
    }).subscribe(({ feligreses, usuarios }) => {
      const felData = feligreses.data || [];
      const usuData = usuarios.data || [];
      this.feligreses = felData.map((f: any) => {
        const u = usuData.find((us: any) => us.id_feligres === f.id);
        return { ...f, usuario_id: u?.id, id_rol: u?.id_rol };
      });
    });
  }

  agregarFeligres() {
        const rol = this.nuevoFeligres.id_rol;
      this.feligresService.crearFeligres(this.nuevoFeligres).subscribe(res => {
      const usuarioId = res?.data?.usuario?.id;
      this.nuevoFeligres = {
        cedula: '',
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        edad: '',
        genero: '',
        direccion: '',
        email: '',
        telefono: '',
        password: '',
        id_rol: 3
      };
            if (usuarioId) {
        this.feligresService.actualizarRol(usuarioId, rol).subscribe(() => {
          this.cargarFeligreses();
        });
      } else {
        this.cargarFeligreses();
      }
    });
  }

  iniciarEdicion(f: any) {
    this.editFeligresId = f.id;
    this.editFeligres = { ...f };
  }

  guardarEdicion() {
    if (this.editFeligresId == null) return;
    const usuarioId = this.editFeligres.usuario_id;
    const rol = this.editFeligres.id_rol;
    this.feligresService.actualizarFeligres(this.editFeligresId, this.editFeligres).subscribe(() => {
      if (usuarioId) {
        this.feligresService.actualizarRol(usuarioId, rol).subscribe(() => {
          this.cancelarEdicion();
          this.cargarFeligreses();
        });
      } else {
        this.cancelarEdicion();
        this.cargarFeligreses();
      }
    });
  }

  cancelarEdicion() {
    this.editFeligresId = null;
    this.editFeligres = {};
  }

  eliminarFeligres(id: number) {
    this.feligresService.eliminarFeligres(id).subscribe(() => {
      this.cargarFeligreses();
    });
  }
}
