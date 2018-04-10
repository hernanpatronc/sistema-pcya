import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ot1Component } from './ot1.component';

describe('Ot1Component', () => {
  let component: Ot1Component;
  let fixture: ComponentFixture<Ot1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ot1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ot1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
