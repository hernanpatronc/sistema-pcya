import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Campos1Component } from './campos1.component';

describe('Campos1Component', () => {
  let component: Campos1Component;
  let fixture: ComponentFixture<Campos1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Campos1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Campos1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
