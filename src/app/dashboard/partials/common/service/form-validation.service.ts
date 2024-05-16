import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  // Image File Validation
  isValidImagePdfFileType(file: FileList): boolean {
    // Define the allowed file types
    const allowedFileTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ];

    // Check if the file type is included in the allowedFileTypes array
    for (let i = 0; i < file.length; i += 1) {
      if (!allowedFileTypes.includes(file[i].type)) return false;
    }

    return true;
  }
}
