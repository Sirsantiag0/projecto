import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GruposComponent } from './grupos.component';
import { GruposService } from '../../../services/grupo.service';

class MockGruposService {
  listarGrupos() {
    return of({ data: [] });
  }
  obtenerArchivosPorGrupo() {
    return of({ data: [] });
  }
}

describe('GruposComponent', () => {
  let component: GruposComponent;
  let fixture: ComponentFixture<GruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposComponent],
      providers: [{ provide: GruposService, useClass: MockGruposService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
