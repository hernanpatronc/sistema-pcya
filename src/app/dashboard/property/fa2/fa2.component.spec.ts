import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fa2Component } from './fa2.component';

describe('Fa2Component', () => {
  let component: Fa2Component;
  let fixture: ComponentFixture<Fa2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fa2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
