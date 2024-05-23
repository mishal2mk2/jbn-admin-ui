import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prodStatusToValue'
})
export class ProdStatusToValuePipe implements PipeTransform {

  transform(prodStatus: number): string {
    switch (prodStatus) {
      case 1:
        return 'Pressing';
      case 2:
        return 'Cutting';
      case 3:
        return 'Edge Banding';
      case 4:
        return 'Boring';
      case 5:
        return 'Checking';
      case 6:
        return 'Packing';
      default:
        return '-';
    }
  }

}
