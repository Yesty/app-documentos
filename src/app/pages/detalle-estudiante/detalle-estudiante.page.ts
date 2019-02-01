import { VentaModalPage } from './../venta-modal/venta-modal.page';
import { Component, OnInit } from '@angular/core';
import { Estudiante, EstudiantesService } from 'src/app/services/estudiantes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { IDocumento, DocumentosService } from 'src/app/services/documentos.service';

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

  documentosEstudiante: IDocumento[];
  estudianteCodigo: string = null;
  constructor(private estudianteService: EstudiantesService,
    private documentosService: DocumentosService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private _router: Router,
    private modalController: ModalController) {
    this.documentosEstudiante = new Array<IDocumento>();
  }

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
      this.documentosEstudiante = new Array<IDocumento>();

      this.documentosService.getDocumentos().subscribe(result => {
        result.forEach(doc => {
          const estado = this.estudiante.documentos.filter(s => s.descripcion == (<IDocumento>doc).descripcion);
          if (estado.length == 0) {
            this.documentosEstudiante.push(doc);
          }
        });
      });

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

  async openModal() {
    const modal = await this.modalController.create({
      component: VentaModalPage,
      componentProps: {
        estudianteCodigo: this.estudianteCodigo
      },
    });

    await modal.present();
  }
}
