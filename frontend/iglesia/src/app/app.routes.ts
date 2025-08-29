import { Routes } from '@angular/router';
import { AsistenciaEventoComponent } from './components/pages/asistencia-evento/asistencia-evento.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';

export const routes: Routes = [
    { path: 'asistencia-evento', component: AsistenciaEventoComponent },
    { path: 'home', component: HomeComponent },
    { path: 'calendario', component: CalendarioComponent },
// instalar librerias paraa automiaizar llenado de rutas import
];
