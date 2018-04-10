import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VuCqTu1Component } from './vu-cq-tu1.component';

describe('VuCqTu1Component', () => {
  let component: VuCqTu1Component;
  let fixture: ComponentFixture<VuCqTu1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuCqTu1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuCqTu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
