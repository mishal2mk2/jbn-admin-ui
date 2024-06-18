import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationUndoFormComponent } from './cancellation-undo-form.component';

describe('CancellationUndoFormComponent', () => {
  let component: CancellationUndoFormComponent;
  let fixture: ComponentFixture<CancellationUndoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancellationUndoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancellationUndoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
