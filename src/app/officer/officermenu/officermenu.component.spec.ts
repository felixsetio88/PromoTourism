import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficermenuComponent } from './officermenu.component';

describe('OfficermenuComponent', () => {
  let component: OfficermenuComponent;
  let fixture: ComponentFixture<OfficermenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficermenuComponent]
    });
    fixture = TestBed.createComponent(OfficermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
