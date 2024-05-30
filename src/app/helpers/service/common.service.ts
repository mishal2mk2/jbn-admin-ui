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

  // Set the Date to yyyy-MM-dd Format
  formatDateToYYYY(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
