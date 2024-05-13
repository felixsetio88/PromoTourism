import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameronComponent } from './cameron.component';

describe('CameronComponent', () => {
  let component: CameronComponent;
  let fixture: ComponentFixture<CameronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameronComponent]
    });
    fixture = TestBed.createComponent(CameronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
