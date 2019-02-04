import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaModalPage } from './venta-modal.page';

describe('VentaModalPage', () => {
  let component: VentaModalPage;
  let fixture: ComponentFixture<VentaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
