import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolePipe'
})
export class RolePipePipe implements PipeTransform {

  transform(role: string): string {
    switch (role) {
      case "MD":
        return 'Managing Director';
      case "GM":
        return 'General Manager';
      case "HR":
        return 'Human Resource Manager';
      case "AC":
        return 'Accountant';
      case "DE":
        return 'Designer Head';
      case "OM":
        return 'Operations Manager';
      case "PM":
        return 'Purchase Manager';
      case "SV":
        return 'Supervisor';
      case "WR":
        return 'Employee';
      case "CU":
        return 'Customer';
      case "US":
        return 'Basic User';
      default:
        return 'NA';
    }
  }


}