import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createProjectGuard } from './create-project.guard';

describe('createProjectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createProjectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
