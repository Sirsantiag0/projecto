import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeligresComponent } from './feligres.component';

describe('FeligresComponent', () => {
  let component: FeligresComponent;
  let fixture: ComponentFixture<FeligresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeligresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeligresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
