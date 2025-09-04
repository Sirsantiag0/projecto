import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HorariosComponent } from './horarios.component';
import { ArchivosEventoService } from '../../../services/archivos-evento.service';

class MockArchivosEventoService {
  listarImagenes() {
    return of({ data: [] });
  }
}

describe('HorariosComponent', () => {
  let component: HorariosComponent;
  let fixture: ComponentFixture<HorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosComponent],
      providers: [{ provide: ArchivosEventoService, useClass: MockArchivosEventoService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});