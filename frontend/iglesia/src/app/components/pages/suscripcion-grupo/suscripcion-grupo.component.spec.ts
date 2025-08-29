import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionGrupoComponent } from './suscripcion-grupo.component';

describe('SuscripcionGrupoComponent', () => {
  let component: SuscripcionGrupoComponent;
  let fixture: ComponentFixture<SuscripcionGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
