import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcheckComponent } from './detailcheck.component';

describe('DetailcheckComponent', () => {
  let component: DetailcheckComponent;
  let fixture: ComponentFixture<DetailcheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailcheckComponent]
    });
    fixture = TestBed.createComponent(DetailcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
