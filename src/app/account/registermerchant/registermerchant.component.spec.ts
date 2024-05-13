import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermerchantComponent } from './registermerchant.component';

describe('RegistermerchantComponent', () => {
  let component: RegistermerchantComponent;
  let fixture: ComponentFixture<RegistermerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistermerchantComponent]
    });
    fixture = TestBed.createComponent(RegistermerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
