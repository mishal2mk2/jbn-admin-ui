import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mDAdminRoleGuard } from './mdadmin-role.guard';

describe('mDAdminRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mDAdminRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
