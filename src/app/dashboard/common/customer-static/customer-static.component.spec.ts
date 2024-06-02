import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStaticComponent } from './customer-static.component';

describe('CustomerStaticComponent', () => {
  let component: CustomerStaticComponent;
  let fixture: ComponentFixture<CustomerStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
