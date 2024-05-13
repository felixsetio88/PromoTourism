import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantmenuComponent } from './merchantmenu.component';

describe('MerchantmenuComponent', () => {
  let component: MerchantmenuComponent;
  let fixture: ComponentFixture<MerchantmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantmenuComponent]
    });
    fixture = TestBed.createComponent(MerchantmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
