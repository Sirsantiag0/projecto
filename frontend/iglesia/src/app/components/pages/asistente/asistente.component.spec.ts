import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AsistenteComponent } from './asistente.component';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';

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

describe('AsistenteComponent', () => {
  let component: AsistenteComponent;
  let fixture: ComponentFixture<AsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenteComponent],
      providers: [{ provide: ArchivosEventoService, useClass: MockArchivosEventoService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
