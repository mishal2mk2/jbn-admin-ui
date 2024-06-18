import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEnterFormComponent } from './payment-enter-form.component';

describe('PaymentEnterFormComponent', () => {
  let component: PaymentEnterFormComponent;
  let fixture: ComponentFixture<PaymentEnterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentEnterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentEnterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
