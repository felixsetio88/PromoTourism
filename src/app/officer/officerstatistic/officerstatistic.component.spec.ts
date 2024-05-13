import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerstatisticComponent } from './officerstatistic.component';

describe('OfficerstatisticComponent', () => {
  let component: OfficerstatisticComponent;
  let fixture: ComponentFixture<OfficerstatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficerstatisticComponent]
    });
    fixture = TestBed.createComponent(OfficerstatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
