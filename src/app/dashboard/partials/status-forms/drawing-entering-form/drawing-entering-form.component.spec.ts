import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingEnteringFormComponent } from './drawing-entering-form.component';

describe('DrawingEnteringFormComponent', () => {
  let component: DrawingEnteringFormComponent;
  let fixture: ComponentFixture<DrawingEnteringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawingEnteringFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawingEnteringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
