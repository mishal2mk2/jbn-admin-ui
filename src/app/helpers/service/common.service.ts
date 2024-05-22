import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

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
}
