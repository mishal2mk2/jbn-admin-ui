import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToCloseFormComponent } from './to-close-form.component';

describe('ToCloseFormComponent', () => {
  let component: ToCloseFormComponent;
  let fixture: ComponentFixture<ToCloseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToCloseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToCloseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
