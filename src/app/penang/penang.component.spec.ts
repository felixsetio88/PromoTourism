import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenangComponent } from './penang.component';

describe('PenangComponent', () => {
  let component: PenangComponent;
  let fixture: ComponentFixture<PenangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenangComponent]
    });
    fixture = TestBed.createComponent(PenangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
