import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeligresService } from '../../../services/feligres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-feligres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-feligres.component.html',
  styleUrls: ['./registro-feligres.component.css']
})
export class RegistroFeligresComponent {
  form: FormGroup;
  
  @Output() closed = new EventEmitter<void>();
  loading = false;

  constructor(private fb: FormBuilder, private feligresService: FeligresService, private router: Router) {
    this.form = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombres: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
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

    const { confirmPassword, fecha_nacimiento, ...feligres } = this.form.value;
    const birthDate = new Date(fecha_nacimiento);
    const edad = new Date().getFullYear() - birthDate.getFullYear();
    this.loading = true;
    setTimeout(() => this.loading = false, 1000);
    this.feligresService.crearFeligres({ ...feligres, fecha_nacimiento: birthDate, edad }).subscribe({
      next: () => {
          Swal.fire({
          title: 'Registro exitoso',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          position: 'center'
        }).then(() => {
          this.router.navigate(['/login']);
        });
        this.form.reset();
      },
      error: err => console.error('Error al registrar feligrés', err)
    });
  }

  close() {
    this.closed.emit();
    this.router.navigate(['/home']);
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