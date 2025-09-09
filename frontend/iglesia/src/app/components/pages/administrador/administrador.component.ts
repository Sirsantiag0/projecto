import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Asistente' },
    { id: 3, nombre: 'Feligres' }
  ];

  constructor(private feligresService: FeligresService) {}

  ngOnInit(): void {
    this.cargarFeligreses();
  }

  cargarFeligreses() {
    this.feligresService.listarFeligreses().subscribe(res => {
      this.feligreses = res.data || [];
    });
  }

  agregarFeligres() {
    this.feligresService.crearFeligres(this.nuevoFeligres).subscribe(() => {
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
      this.cargarFeligreses();
    });
  }

  iniciarEdicion(f: any) {
    this.editFeligresId = f.id;
    this.editFeligres = { ...f };
  }

  guardarEdicion() {
    if (this.editFeligresId == null) return;
    this.feligresService.actualizarFeligres(this.editFeligresId, this.editFeligres).subscribe(() => {
      this.cancelarEdicion();
      this.cargarFeligreses();
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
    asignarRol(f: any) {
    this.feligresService.actualizarRol(f.id, f.id_rol).subscribe();
  }

}
