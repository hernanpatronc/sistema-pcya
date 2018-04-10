import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeOfLo1Component } from './de-of-lo1.component';

describe('DeOfLo1Component', () => {
  let component: DeOfLo1Component;
  let fixture: ComponentFixture<DeOfLo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeOfLo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeOfLo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
