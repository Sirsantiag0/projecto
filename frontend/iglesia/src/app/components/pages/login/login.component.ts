import { Component, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @Output() closed = new EventEmitter<void>();
  @ViewChild('correoInput') correoInput!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    
    ngAfterViewInit() {
    this.correoInput.nativeElement.focus();
  }


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { correo, password } = this.form.value;
    this.loading = true;
    this.authService.login(correo, password).subscribe({
           next: () => {
        this.loading = false;
        this.closed.emit();
        if (this.router.url === '/login') {
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        this.loading = false;
        console.error('Login error', err);
        Swal.fire({
          title: 'Error',
          text: 'El correo o la contraseña son incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          position: 'center'
        });
      }
    });
  }
  close() {
    this.closed.emit();
    if (this.router.url === '/login') {
      this.router.navigate(['/home']);
    }
  }
}