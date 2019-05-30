import { TestBed } from '@angular/core/testing';

import { OperacionesDenunciasService } from './operaciones-denuncias.service';

describe('OperacionesDenunciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesDenunciasService = TestBed.get(OperacionesDenunciasService);
    expect(service).toBeTruthy();
  });
});
