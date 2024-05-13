import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewlistComponent } from './reviewlist.component';

describe('ReviewlistComponent', () => {
  let component: ReviewlistComponent;
  let fixture: ComponentFixture<ReviewlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewlistComponent]
    });
    fixture = TestBed.createComponent(ReviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
