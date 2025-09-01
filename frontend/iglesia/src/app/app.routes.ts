import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AsistenciaEventoComponent } from './components/pages/asistencia-evento/asistencia-evento.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'asistencia-evento', component: AsistenciaEventoComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
  // instalar librerias paraa automiaizar llenado de rutas import
];