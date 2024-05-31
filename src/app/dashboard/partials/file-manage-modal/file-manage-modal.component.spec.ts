import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManageModalComponent } from './file-manage-modal.component';

describe('FileManageModalComponent', () => {
  let component: FileManageModalComponent;
  let fixture: ComponentFixture<FileManageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileManageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
