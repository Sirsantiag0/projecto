import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeligresService } from '../../../services/feligres.service';

@Component({
  selector: 'app-registro-feligres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-feligres.component.html',
  styleUrls: ['./registro-feligres.component.css']
})
export class RegistroFeligresComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private feligresService: FeligresService) {
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.feligresService.crearFeligres(this.form.value).subscribe({
      next: () => this.form.reset(),
      error: err => console.error('Error al registrar feligrés', err)
    });
  }
}
