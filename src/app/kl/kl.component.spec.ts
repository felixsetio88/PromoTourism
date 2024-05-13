import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlComponent } from './kl.component';

describe('KlComponent', () => {
  let component: KlComponent;
  let fixture: ComponentFixture<KlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlComponent]
    });
    fixture = TestBed.createComponent(KlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
