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
        return 'Waiting Confirmation';
      case 3:
        return 'Drawing';
      case 4:
        return 'Material Estimate';
      case 5:
        return 'Material Arrival';
      case 6:
        return 'Production';
      case 7:
        return 'Payment Close';
      case 8:
        return 'Delivery';
      case 9:
        return 'Installation';
      case 10:
        return 'Awaiting Service';
      case 11:
        return 'Service';
      case 12:
        return 'To Close';
      case 13:
        return 'Closed';
      case 14:
        return 'Cancelled';
      default:
        return '-';
    }
  }

}
