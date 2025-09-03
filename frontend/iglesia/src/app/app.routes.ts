import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AsistenciaEventoComponent } from './components/pages/asistencia-evento/asistencia-evento.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';
import { AsistenteComponent } from './components/pages/asistente/asistente.component';
import { RegistroFeligresComponent } from './components/pages/registro-feligres/registro-feligres.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'asistencia-evento', component: AsistenciaEventoComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'asistente', component: AsistenteComponent },
      { path: 'home', component: HomeComponent },
      { path: 'registrar', component: RegistroFeligresComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
  // instalar librerias paraa automiaizar llenado de rutas import
];