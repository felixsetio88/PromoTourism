import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerreportComponent } from './officerreport.component';

describe('OfficerreportComponent', () => {
  let component: OfficerreportComponent;
  let fixture: ComponentFixture<OfficerreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficerreportComponent]
    });
    fixture = TestBed.createComponent(OfficerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
