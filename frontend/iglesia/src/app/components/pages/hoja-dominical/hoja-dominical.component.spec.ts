import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { HojaDominicalComponent } from './hoja-dominical.component';

describe('HojaDominicalComponent', () => {
  let component: HojaDominicalComponent;
  let fixture: ComponentFixture<HojaDominicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
            imports: [HojaDominicalComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HojaDominicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
