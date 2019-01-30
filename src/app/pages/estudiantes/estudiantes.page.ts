import { EstudiantesService, Estudiante } from './../../services/estudiantes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {

  estudiante: Estudiante = {
    codigo: '',
    documento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    celular: '',
    fechaCreacion: 0,
  };

  estudianteCodigo: string = null;
  constructor(private estudianteService: EstudiantesService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController) { }

  ngOnInit() {
    this.estudianteCodigo = this.route.snapshot.params['id'];

    if (this.estudianteCodigo) {
      this.loadEstudiante();
    }
  }

  async loadEstudiante() {

    const loading = await this.loadingController.create({
      message: 'Cargando estudiante...',
      spinner: 'circles'
    });

    await loading.present();

    this.estudianteService.getEstudiante(this.estudianteCodigo).subscribe(res => {
      loading.dismiss();
      this.estudiante = <Estudiante>res;
    });
  }

  async saveEstudiante() {
    const loading = await this.loadingController.create({
      message: 'Cargando estudiante...',
      spinner: 'circles'
    });

    await loading.present();

    if (this.estudianteCodigo) {
      this.estudianteService.updateEstudiante(this.estudiante, this.estudianteCodigo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.estudiante.fechaCreacion = new Date().getTime();
      this.estudianteService.addEstudiante(this.estudiante).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
  }
}
