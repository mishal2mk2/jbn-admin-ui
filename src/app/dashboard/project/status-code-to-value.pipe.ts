import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusCodeToValue'
})
export class StatusCodeToValuePipe implements PipeTransform {

  transform(statusCode: number): string {
    switch (statusCode) {
      case 1:
        return 'Order Entering';
      case 2:
        return 'Drawing';
      case 3:
        return 'Material Estimate';
      case 4:
        return 'Waiting Confirmation';
      case 5:
        return 'Material Arrival';
      case 6:
        return 'Production';
      case 7:
        return 'Delivery';
      case 8:
        return 'Installation';
      case 9:
        return 'Awaiting Service';
      case 10:
        return 'Service';
      case 11:
        return 'To Close';
      case 12:
        return 'Closed';
      case 13:
        return 'Cancelled';
      default:
        return '-';
    }
  }

}
