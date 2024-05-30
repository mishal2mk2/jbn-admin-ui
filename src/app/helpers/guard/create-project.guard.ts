import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { CommonService } from '../service/common.service';

export const createProjectGuard: CanActivateFn = (route, state) => {
  const _CommonService = inject(CommonService);
  const userData = _CommonService.getAllUserData();

  if (userData) {
    const { role } = userData;

    return _CommonService.MainAdminRoleArray.includes(role);
  } else {
    return false;
  }
};
