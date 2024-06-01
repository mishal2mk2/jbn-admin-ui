import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-manage-modal',
  templateUrl: './file-manage-modal.component.html',
  styleUrl: './file-manage-modal.component.css',
})
export class FileManageModalComponent implements OnInit {
  @ViewChild('FileModal') defaultModal!: ElementRef;
  @Input() FileArray: any[] = [];

  fileUrl!: string;
  isFilePDF!: boolean;

  constructor() {}

  ngOnInit(): void {}

  deleteImage(id: number) {
    // this.images = this.images.filter((image) => image.id !== id);
  }

  // Open the image section
  openImage(url: string) {
    this.fileUrl = url;
    this.isFilePDF = this.fileUrl.endsWith('.pdf');

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
