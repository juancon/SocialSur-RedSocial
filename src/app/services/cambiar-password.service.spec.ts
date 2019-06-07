import { TestBed } from '@angular/core/testing';

import { CambiarPasswordService } from './cambiar-password.service';

describe('CambiarPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CambiarPasswordService = TestBed.get(CambiarPasswordService);
    expect(service).toBeTruthy();
  });
});
