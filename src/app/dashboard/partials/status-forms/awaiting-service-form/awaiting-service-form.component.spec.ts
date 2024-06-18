import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingServiceFormComponent } from './awaiting-service-form.component';

describe('AwaitingServiceFormComponent', () => {
  let component: AwaitingServiceFormComponent;
  let fixture: ComponentFixture<AwaitingServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwaitingServiceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
