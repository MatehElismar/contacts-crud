import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesComponent } from './calificaciones.component';

describe('CalificacionesComponent', () => {
  let component: CalificacionesComponent;
  let fixture: ComponentFixture<CalificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
