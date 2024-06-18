import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompleteFormComponent } from './project-complete-form.component';

describe('ProjectCompleteFormComponent', () => {
  let component: ProjectCompleteFormComponent;
  let fixture: ComponentFixture<ProjectCompleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCompleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCompleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
