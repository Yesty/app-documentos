import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiantesService } from '../services/estudiantes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  estudiantes: any[];

  constructor(
    private estudianteServices: EstudiantesService,
    private _router: Router) {
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
    this._router.navigate(['/dashboard', 'estudiantes', item.id]);
  }

  sharedItem(termino: string) {
    this.estudianteServices.getEstudiantes().subscribe(res => {
      this.estudiantes = res.filter(s => !s.nombre.toLowerCase().indexOf(termino.toLowerCase()));
    });

    if (termino == '') {
      this.reloadItem();
    }
  }

  reloadItem() {
    this.estudianteServices.getEstudiantes().subscribe(res => {
      this.estudiantes = res;
    });
  }
}
