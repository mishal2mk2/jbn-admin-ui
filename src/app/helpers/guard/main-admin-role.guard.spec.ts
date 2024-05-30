import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mainAdminRoleGuard } from './main-admin-role.guard';

describe('mainAdminRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mainAdminRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
