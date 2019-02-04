import { IDocumento } from './../../services/documentos.service';
import { EstudiantesService, Estudiante } from './../../services/estudiantes.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  estudiante: Estudiante = {
    codigo: '',
    documento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    celular: '',
    fechaCreacion: 0,
    documentos: new Array<IDocumento>(),
  };

  estudianteCodigo: string = null;

  constructor(private estudianteService: EstudiantesService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async saveEstudiante() {
    const loading = await this.loadingController.create({
      message: 'Creando estudiante...',
      spinner: 'circles'
    });

    await loading.present();

    if (this.estudiante.codigo) {
      this.estudiante.fechaCreacion = new Date().getTime();
      this.estudianteService.addEstudiante(this.estudiante).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      loading.dismiss();

      const toast = await this.toastController.create({
        message: 'Por for diligenciar todo el formulario',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  }
}
