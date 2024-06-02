import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUserStaticComponent } from './basic-user-static.component';

describe('BasicUserStaticComponent', () => {
  let component: BasicUserStaticComponent;
  let fixture: ComponentFixture<BasicUserStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicUserStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicUserStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
