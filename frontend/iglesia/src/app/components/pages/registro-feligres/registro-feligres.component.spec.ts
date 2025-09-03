import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistroFeligresComponent } from './registro-feligres.component';

describe('RegistroFeligresComponent', () => {
  let component: RegistroFeligresComponent;
  let fixture: ComponentFixture<RegistroFeligresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RegistroFeligresComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroFeligresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
