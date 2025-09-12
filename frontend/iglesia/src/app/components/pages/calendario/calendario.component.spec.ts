import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioComponent } from './calendario.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { AsistenciaEventoService, Evento  } from '../../../services/asistencia-evento.service';
import { AuthService } from '../../../services/auth.service';

class BreakpointObserverStub {
  observe() {
    return of({ matches: false });
  }
}

  class AsistenciaEventoServiceStub {
    listarEventos() {
      return of({ data: [] as Evento[] });
    }
    registrarAsistencia() {
      return of({});
    }
    obtenerAsistenciasPorFeligres() {
      return of({ data: [] });
    }
  }

  class AuthServiceStub {
    user() {
      return { id_feligres: 1 } as any;
    }
  }

describe('CalendarioComponent', () => {
  let component: CalendarioComponent;
  let fixture: ComponentFixture<CalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [CalendarioComponent],
        providers: [
          { provide: BreakpointObserver, useClass: BreakpointObserverStub },
          { provide: AsistenciaEventoService, useClass: AsistenciaEventoServiceStub },
          { provide: AuthService, useClass: AuthServiceStub }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide participate button after asistencia', () => {
    const today = new Date().toISOString().split('T')[0];
    const evento: Evento = { id: 1, fecha: today, hora: '10:00', descripcion: 'Test' };
    component.listEventos = [evento];
    fixture.detectChanges();

    component.marcarAsistencia(evento);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('.evento button');
    expect(boton).toBeNull();
  });
});
