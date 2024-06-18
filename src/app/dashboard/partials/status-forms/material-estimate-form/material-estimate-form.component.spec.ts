import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEstimateFormComponent } from './material-estimate-form.component';

describe('MaterialEstimateFormComponent', () => {
  let component: MaterialEstimateFormComponent;
  let fixture: ComponentFixture<MaterialEstimateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialEstimateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialEstimateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
