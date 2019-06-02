import { TestBed } from '@angular/core/testing';

import { BorrarArchivoService } from './borrar-archivo.service';

describe('BorrarArchivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BorrarArchivoService = TestBed.get(BorrarArchivoService);
    expect(service).toBeTruthy();
  });
});
