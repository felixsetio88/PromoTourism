import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderlistComponent } from './customerorderlist.component';

describe('CustomerorderlistComponent', () => {
  let component: CustomerorderlistComponent;
  let fixture: ComponentFixture<CustomerorderlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerorderlistComponent]
    });
    fixture = TestBed.createComponent(CustomerorderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
