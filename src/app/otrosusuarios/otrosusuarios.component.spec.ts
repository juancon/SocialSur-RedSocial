import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosusuariosComponent } from './otrosusuarios.component';

describe('OtrosusuariosComponent', () => {
  let component: OtrosusuariosComponent;
  let fixture: ComponentFixture<OtrosusuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosusuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
