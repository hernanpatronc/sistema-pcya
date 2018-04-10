import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Campos2Component } from './campos2.component';

describe('Campos2Component', () => {
  let component: Campos2Component;
  let fixture: ComponentFixture<Campos2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Campos2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Campos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
