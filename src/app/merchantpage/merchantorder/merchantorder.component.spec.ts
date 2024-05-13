import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantorderComponent } from './merchantorder.component';

describe('MerchantorderComponent', () => {
  let component: MerchantorderComponent;
  let fixture: ComponentFixture<MerchantorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantorderComponent]
    });
    fixture = TestBed.createComponent(MerchantorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
