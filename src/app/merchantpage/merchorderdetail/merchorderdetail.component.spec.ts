import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchorderdetailComponent } from './merchorderdetail.component';

describe('MerchorderdetailComponent', () => {
  let component: MerchorderdetailComponent;
  let fixture: ComponentFixture<MerchorderdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchorderdetailComponent]
    });
    fixture = TestBed.createComponent(MerchorderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
