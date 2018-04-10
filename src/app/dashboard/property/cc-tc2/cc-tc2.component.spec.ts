import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcTc2Component } from './cc-tc2.component';

describe('CcTc2Component', () => {
  let component: CcTc2Component;
  let fixture: ComponentFixture<CcTc2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcTc2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
