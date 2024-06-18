import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialArrivalFormComponent } from './material-arrival-form.component';

describe('MaterialArrivalFormComponent', () => {
  let component: MaterialArrivalFormComponent;
  let fixture: ComponentFixture<MaterialArrivalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialArrivalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialArrivalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
