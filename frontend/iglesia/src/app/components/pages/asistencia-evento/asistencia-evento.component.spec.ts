import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaEventoComponent } from './asistencia-evento.component';

describe('AsistenciaEventoComponent', () => {
  let component: AsistenciaEventoComponent;
  let fixture: ComponentFixture<AsistenciaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
