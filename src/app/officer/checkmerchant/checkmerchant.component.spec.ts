import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmerchantComponent } from './checkmerchant.component';

describe('CheckmerchantComponent', () => {
  let component: CheckmerchantComponent;
  let fixture: ComponentFixture<CheckmerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckmerchantComponent]
    });
    fixture = TestBed.createComponent(CheckmerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
