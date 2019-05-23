import { TestBed } from '@angular/core/testing';

import { OperacionesPeticionesService } from './operaciones-peticiones.service';

describe('OperacionesPeticionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesPeticionesService = TestBed.get(OperacionesPeticionesService);
    expect(service).toBeTruthy();
  });
});
