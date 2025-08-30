import { Component, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @Output() closed = new EventEmitter<void>();
  @ViewChild('correoInput') correoInput!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    ngAfterViewInit() {
    this.correoInput.nativeElement.focus();
  }


  submit() {
    const { correo, password } = this.form.value;
    if (!correo || !password) return;
    this.loading = true;
    setTimeout(() => {
    this.loading = false;
    this.closed.emit();
    }, 1000);
    this.authService.login(correo, password).subscribe({
      error: err => console.error('Login error', err)
    });
  }
  close() {
    this.closed.emit();
  }
}
