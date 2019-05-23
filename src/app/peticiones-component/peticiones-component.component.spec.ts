import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesComponentComponent } from './peticiones-component.component';

describe('PeticionesComponentComponent', () => {
  let component: PeticionesComponentComponent;
  let fixture: ComponentFixture<PeticionesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
