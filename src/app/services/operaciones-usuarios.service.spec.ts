import { TestBed } from '@angular/core/testing';

import { OperacionesUsuariosService } from './operaciones-usuarios.service';

describe('OperacionesUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesUsuariosService = TestBed.get(OperacionesUsuariosService);
    expect(service).toBeTruthy();
  });
});
