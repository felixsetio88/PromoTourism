import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustorderinfoComponent } from './custorderinfo.component';

describe('CustorderinfoComponent', () => {
  let component: CustorderinfoComponent;
  let fixture: ComponentFixture<CustorderinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustorderinfoComponent]
    });
    fixture = TestBed.createComponent(CustorderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
