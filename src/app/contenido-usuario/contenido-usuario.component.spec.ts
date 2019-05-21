import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoUsuarioComponent } from './contenido-usuario.component';

describe('ContenidoUsuarioComponent', () => {
  let component: ContenidoUsuarioComponent;
  let fixture: ComponentFixture<ContenidoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
