import { EstudiantesService } from './../services/estudiantes.service';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../services/estudiantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  estudiantes: any[];

  constructor(private estudianteServices: EstudiantesService, private _router: Router) {
    this.estudianteServices.getEstudiantes().subscribe(res => {
      this.estudiantes = res;
    });
  }

  ngOnInit(): void {

  }

  remove(item) {
    this.estudianteServices.deleteEstudiante(item.id);
  }

  // Métodos
  edit(item) {
    this._router.navigate(['/estudiantes', item.id]);
  }

  sharedItem(termino: string) {
    console.log(this.estudiantes);
  }

  reloadItem() {
    console.log('limpia');
    this.estudianteServices.getEstudiantes().subscribe(res => {
      this.estudiantes = res;
    });
  }
}
