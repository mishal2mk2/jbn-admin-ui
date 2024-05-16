import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorSpanComponent } from './form-error-span.component';

describe('FormErrorSpanComponent', () => {
  let component: FormErrorSpanComponent;
  let fixture: ComponentFixture<FormErrorSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormErrorSpanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormErrorSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
