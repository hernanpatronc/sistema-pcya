import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcTc1Component } from './cc-tc1.component';

describe('CcTc1Component', () => {
  let component: CcTc1Component;
  let fixture: ComponentFixture<CcTc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcTc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
