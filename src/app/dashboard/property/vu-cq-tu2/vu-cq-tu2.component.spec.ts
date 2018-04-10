import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VuCqTu2Component } from './vu-cq-tu2.component';

describe('VuCqTu2Component', () => {
  let component: VuCqTu2Component;
  let fixture: ComponentFixture<VuCqTu2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuCqTu2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuCqTu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
