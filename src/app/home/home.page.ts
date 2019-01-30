import { EstudiantesService } from './../services/estudiantes.service';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../services/estudiantes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  estudiantes: any[];

  constructor(private estudianteServices: EstudiantesService) { }

  ngOnInit(): void {
    this.estudianteServices.getEstudiantes().subscribe(res => {
      this.estudiantes = res;
    });
  }

  remove(item) {
    this.estudianteServices.deleteEstudiante(item.id);
  }
}
