import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantloginComponent } from './merchantlogin.component';

describe('MerchantloginComponent', () => {
  let component: MerchantloginComponent;
  let fixture: ComponentFixture<MerchantloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantloginComponent]
    });
    fixture = TestBed.createComponent(MerchantloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
