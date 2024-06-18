import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEnteringFormComponent } from './order-entering-form.component';

describe('OrderEnteringFormComponent', () => {
  let component: OrderEnteringFormComponent;
  let fixture: ComponentFixture<OrderEnteringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderEnteringFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderEnteringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
