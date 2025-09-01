import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFeligresComponent } from './register-feligres.component';

describe('RegisterFeligresComponent', () => {
  let component: RegisterFeligresComponent;
  let fixture: ComponentFixture<RegisterFeligresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFeligresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFeligresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
