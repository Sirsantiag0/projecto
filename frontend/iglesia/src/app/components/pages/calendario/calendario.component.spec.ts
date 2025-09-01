import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarioComponent } from './calendario.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

class BreakpointObserverStub {
  observe() {
    return of({ matches: false });
  }
}

describe('CalendarioComponent', () => {
  let component: CalendarioComponent;
  let fixture: ComponentFixture<CalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioComponent],
      providers: [{ provide: BreakpointObserver, useClass: BreakpointObserverStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
