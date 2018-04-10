import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fa1Component } from './fa1.component';

describe('Fa1Component', () => {
  let component: Fa1Component;
  let fixture: ComponentFixture<Fa1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fa1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fa1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
