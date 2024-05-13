import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderComponent } from './customerorder.component';

describe('CustomerorderComponent', () => {
  let component: CustomerorderComponent;
  let fixture: ComponentFixture<CustomerorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerorderComponent]
    });
    fixture = TestBed.createComponent(CustomerorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
