import { TestBed } from '@angular/core/testing';

import { OperacioneAmigosService } from './operacione-amigos.service';

describe('OperacioneAmigosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacioneAmigosService = TestBed.get(OperacioneAmigosService);
    expect(service).toBeTruthy();
  });
});
