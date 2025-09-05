import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AsistenteComponent } from './asistente.component';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';
import { AsistenciaEventoService, Evento } from '../../../services/asistencia-evento.service';

class MockArchivosEventoService {
  listarImagenes() {
    return of({ data: [] });
  }
  subirArchivo() {
    return of({});
  }
  eliminarArchivo() {
    return of({});
  }
  reemplazarArchivo() {
    return of({});
  }
}

class MockAsistenciaEventoService {
  listarEventos() {
    return of({ data: [] as Evento[] });
  }
  crearEvento(_: Evento) {
    return of({});
  }
  actualizarEvento(_: number, __: Evento) {
    return of({});
  }
  eliminarEvento(_: number) {
    return of({});
  }
}


describe('AsistenteComponent', () => {
  let component: AsistenteComponent;
  let fixture: ComponentFixture<AsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenteComponent],
      providers: [
        { provide: ArchivosEventoService, useClass: MockArchivosEventoService },
        { provide: AsistenciaEventoService, useClass: MockAsistenciaEventoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
