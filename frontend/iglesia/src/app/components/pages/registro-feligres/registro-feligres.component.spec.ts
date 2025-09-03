import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFeligresComponent } from './registro-feligres.component';

describe('RegistroFeligresComponent', () => {
  let component: RegistroFeligresComponent;
  let fixture: ComponentFixture<RegistroFeligresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroFeligresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFeligresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
