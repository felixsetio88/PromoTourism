import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantpageComponent } from './merchantpage.component';

describe('MerchantpageComponent', () => {
  let component: MerchantpageComponent;
  let fixture: ComponentFixture<MerchantpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantpageComponent]
    });
    fixture = TestBed.createComponent(MerchantpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
