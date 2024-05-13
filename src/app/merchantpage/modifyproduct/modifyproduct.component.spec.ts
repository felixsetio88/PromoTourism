import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyproductComponent } from './modifyproduct.component';

describe('ModifyproductComponent', () => {
  let component: ModifyproductComponent;
  let fixture: ComponentFixture<ModifyproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyproductComponent]
    });
    fixture = TestBed.createComponent(ModifyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
