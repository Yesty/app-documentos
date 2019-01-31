import { PopOverPage } from './../pop-over/pop-over.page';
import { Component, OnInit } from '@angular/core';
import { Estudiante, EstudiantesService } from 'src/app/services/estudiantes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';
import { IDocumento } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-detalle-estudiante',
  templateUrl: './detalle-estudiante.page.html',
  styleUrls: ['./detalle-estudiante.page.scss'],
})
export class DetalleEstudiantePage implements OnInit {

  estudiante: Estudiante = {
    codigo: '',
    documento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    celular: '',
    fechaCreacion: 0,
    documentos: new Array<IDocumento>()
  };

  estudianteCodigo: string = null;
  constructor(private estudianteService: EstudiantesService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private _router: Router,
    private popOverController: PopoverController) { }

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

  remove() {
    this.estudianteService.deleteEstudiante(this.estudianteCodigo);
    this.nav.navigateBack('home');
  }

  // Métodos
  edit() {
    this._router.navigate(['/estudiantes', this.estudianteCodigo]);
  }

  async openModal(ev: Event) {
    const popover = await this.popOverController.create({
      component: PopOverPage,
      componentProps: {
        estudianteCodigo: this.estudianteCodigo
      },
      event: ev
    });

    popover.present();
  }
}
