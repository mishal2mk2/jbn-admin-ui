import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  MainAdminRoleArray = ['MD', 'GM', 'HR'];

  constructor() {}

  // Get all the user data from the Token
  getAllUserData() {
    const token = window.sessionStorage.getItem('_TOKEN');

    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(JSON.parse(token));

      const object = {
        id: decodedToken._id,
        name: decodedToken.username,
        mobile: decodedToken.mobile,
        mail: decodedToken.mail,
        role: decodedToken.role,
        isBlocked: decodedToken.isBlocked,
      };

      return object;
    } else {
      return null;
    }
  }

  // Status section Role Based Access
  private statusRoleBasesAccessCore(accessRoleArray: any[]) {
    const userData = this.getAllUserData();

    if (userData) {
      const { role } = userData;

      const isHaveRoleAccess = accessRoleArray.includes(role);

      if (!isHaveRoleAccess) {
        return false;
      }

      return true;
    }
    return false;
  }

  // Status section Role Based Access
  statusRoleBasesAccess(orderStatus: number) {
    let isHaveRoleAccess;

    // Check the role based Access Logic
    if (orderStatus === 2) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'DE',
      ]);
    } else if (orderStatus === 3) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'PM',
        'OM',
      ]);
    } else if (orderStatus === 4) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'AC',
      ]);
    } else if (orderStatus === 5) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'OM',
      ]);
    } else if (orderStatus === 6) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'SV',
      ]);
    } else if (orderStatus === 7) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'PM',
        'OM',
      ]);
    } else if (orderStatus === 8) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'SV',
      ]);
    } else if (orderStatus === 9) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === 10) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === 11) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === 12) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === 13) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    }

    return isHaveRoleAccess;
  }

  // Filter the Project data relate to the Role Based
  filterProjectWithRoleBased(role: string, orderStatus: number) {
    if (role === 'SsV') {
      return (
        orderStatus === 5 ||
        orderStatus === 6 ||
        orderStatus === 7 ||
        orderStatus === 8
      );
    }

    return true;
  }

  // Set the Date to yyyy-MM-dd Format
  formatDateToYYYY(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
