import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ot2Component } from './ot2.component';

describe('Ot2Component', () => {
  let component: Ot2Component;
  let fixture: ComponentFixture<Ot2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ot2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ot2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
