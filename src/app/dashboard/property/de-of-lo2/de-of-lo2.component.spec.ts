import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeOfLo2Component } from './de-of-lo2.component';

describe('DeOfLo2Component', () => {
  let component: DeOfLo2Component;
  let fixture: ComponentFixture<DeOfLo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeOfLo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeOfLo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
