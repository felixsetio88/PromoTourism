import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlinkComponent } from './navlink.component';

describe('NavlinkComponent', () => {
  let component: NavlinkComponent;
  let fixture: ComponentFixture<NavlinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavlinkComponent]
    });
    fixture = TestBed.createComponent(NavlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
