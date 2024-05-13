import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptListComponent } from './receiptlist.component';

describe('ReceiptlistComponent', () => {
  let component: ReceiptListComponent;
  let fixture: ComponentFixture<ReceiptListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptListComponent]
    });
    fixture = TestBed.createComponent(ReceiptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
