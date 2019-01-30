import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesPage } from './estudiantes.page';

describe('EstudiantesPage', () => {
  let component: EstudiantesPage;
  let fixture: ComponentFixture<EstudiantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
