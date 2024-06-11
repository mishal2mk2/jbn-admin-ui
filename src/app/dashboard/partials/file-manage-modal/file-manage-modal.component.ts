import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../helpers/service/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-manage-modal',
  templateUrl: './file-manage-modal.component.html',
  styleUrl: './file-manage-modal.component.css',
})
export class FileManageModalComponent implements OnInit {
  @ViewChild('FileModal') defaultModal!: ElementRef;
  @Input() FileArray: any[] = [];
  @Input() FileKey: string = '';

  fileUrl!: string;
  isFilePDF!: boolean;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _CommonService: CommonService
  ) {}

  ngOnInit(): void {}

  deleteImage(fileId: string, index: number) {
    const object = {
      fileId: fileId,
      key: this.FileKey,
    };

    // Take the Project ID form the query params
    const { id } = this.route.snapshot.queryParams;

    // Send the APi for change the Status or submit
    this._CommonService.projectFileDelete(object, id).subscribe({
      next: () => {
        this.toastr.success('Successfully delete File', 'Success');

        // Delete the file from the array
        this.FileArray.splice(index, 1);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  getFileName(url: string) {
    const splitedUrl = url.split('/');

    return splitedUrl[splitedUrl.length - 1];
  }

  isTheUrlIsPdf(url: string) {
    return url.endsWith('.pdf');
  }

  // Dowload the file section
  dowloadTheFile(url: string) {
    window.open(url, '_blank');
  }

  // Open the image section
  openImage(url: string) {
    this.fileUrl = url;
    this.isFilePDF = this.isTheUrlIsPdf(this.fileUrl);

    // Modal Section Logic
    const modal = this.defaultModal.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }
  }

  closeModal() {
    const modal = this.defaultModal?.nativeElement as HTMLElement;
    const modalOverlay = document.getElementById('modal-backdrop');

    if (modal && modalOverlay) {
      //modal toggle settings
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      modalOverlay.classList.toggle('hidden');
    }
  }
}
