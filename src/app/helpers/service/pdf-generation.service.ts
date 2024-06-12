import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfGenerationService {
  constructor() {}

  public captureScreen(elementId: string, fileName: string): void {
    const data = document.getElementById(elementId);
    const padding = 10;

    if (data) {
      html2canvas(data).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - padding * 2; // Adjust width for padding
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = padding;

        pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - padding * 2;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight + padding;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight - padding * 2;
        }

        pdf.save(fileName);
      });
    }
  }
}
