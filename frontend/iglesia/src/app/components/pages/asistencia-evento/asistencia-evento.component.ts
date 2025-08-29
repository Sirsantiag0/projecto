import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-asistencia-evento',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './asistencia-evento.component.html',
  styleUrls: ['./asistencia-evento.component.css']
})
export class AsistenciaEventoComponent implements OnInit {
  registroForm!: FormGroup;
  // Constructor que inyecta los servicios necesarios
  constructor(private fb: FormBuilder,
  ) { }
  // Método para construir el formulario reactivo
  private buildForm(): void {
    this.registroForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Dosage: ['', Validators.required],
      Presentation: ['', Validators.required],
      AdministrationRoute: ['', Validators.required],
      ActiveIngredient: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.buildForm();
  }
  registrarMedicamento() {
  }
  // Mostrar Alerta (Reutilizable)
  mostrarAlertaSwal(mensaje: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: icon === 'error' ? 'Error' : icon === 'warning' ? 'Advertencia' : 'Información',
      text: mensaje,
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'center'
    });
  }
  regresar() {
    // this.dialogRef.close();
  }
}