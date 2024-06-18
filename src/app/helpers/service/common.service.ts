import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { OrderStatus } from '../interface/project_status.modal';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private AUTH_API = environment.API_ENDPOINT;

  MainAdminRoleArray = ['MD', 'GM', 'HR'];

  constructor(private http: HttpClient) {}

  // Project File Delete API
  projectFileDelete(obj: any, orderID: string) {
    return this.http.post<any>(
      `${this.AUTH_API}/project/deleteFile/${orderID}`,
      obj
    );
  }

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
    if (orderStatus === OrderStatus.ORDER_ENTERING) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === OrderStatus.WAITING_CONFIRMATION) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'AC',
      ]);
    } else if (orderStatus === OrderStatus.DRAWING) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'DE',
      ]);
    } else if (orderStatus === OrderStatus.MATERIAL_ESTIMATE) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'PM',
        'OM',
      ]);
    } else if (orderStatus === OrderStatus.MATERIAL_ARRIVAL) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'OM',
      ]);
    } else if (orderStatus === OrderStatus.PRODUCTION) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'SV',
      ]);
    } else if (orderStatus === OrderStatus.CLOSE_PAYMENT) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'AC',
      ]);
    } else if (orderStatus === OrderStatus.DELIVERY) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'PM',
        'OM',
      ]);
    } else if (orderStatus === OrderStatus.INSTALLATION) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
        'SV',
      ]);
    } else if (orderStatus === OrderStatus.AWAITING_SERVICE) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === OrderStatus.SERVICE) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === OrderStatus.TO_CLOSE) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === OrderStatus.CLOSED) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    } else if (orderStatus === OrderStatus.CANCELLED) {
      isHaveRoleAccess = this.statusRoleBasesAccessCore([
        ...this.MainAdminRoleArray,
      ]);
    }

    return isHaveRoleAccess;
  }

  // Filter the Project data relate to the Role Based
  filterProjectWithRoleBased(role: string, orderStatus: number) {
    if (role === 'SV') {
      return (
        orderStatus === OrderStatus.MATERIAL_ARRIVAL ||
        orderStatus === OrderStatus.PRODUCTION ||
        orderStatus === OrderStatus.DELIVERY ||
        orderStatus === OrderStatus.INSTALLATION
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
