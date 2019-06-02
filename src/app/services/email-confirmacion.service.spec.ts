import { TestBed } from '@angular/core/testing';

import { EmailConfirmacionService } from './email-confirmacion.service';

describe('EmailConfirmacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailConfirmacionService = TestBed.get(EmailConfirmacionService);
    expect(service).toBeTruthy();
  });
});
