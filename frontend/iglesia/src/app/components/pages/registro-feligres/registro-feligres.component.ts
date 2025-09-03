import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...feligres } = this.form.value;
    this.feligresService.crearFeligres(feligres).subscribe({
      next: () => this.form.reset(),
      error: err => console.error('Error al registrar feligrés', err)
    });
  }
  
  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }
}
