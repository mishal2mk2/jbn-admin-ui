import { CanActivateFn, Router } from '@angular/router';
import { USER_KEY } from '../../auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  //checking user token in sessionStorage
  if (window.sessionStorage.getItem(USER_KEY)) {
    return true;
  } else {
    router.navigateByUrl('/auth/login');
    return false;
  }
};
