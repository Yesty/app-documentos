import { IDocumento } from './../../services/documentos.service';
import { Estudiante, EstudiantesService } from './../../services/estudiantes.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, LoadingController } from '@ionic/angular';
import { DocumentosService } from 'src/app/services/documentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.page.html',
  styleUrls: ['./pop-over.page.scss'],
})
export class PopOverPage implements OnInit {

  estudianteCodigo: string;
  estudiante: Estudiante;
  documentos: any[];

  constructor(private navParams: NavParams,
    private popoverController: PopoverController,
    private documentoServices: DocumentosService,
    private estudianteServices: EstudiantesService,
    private loadingController: LoadingController,
    private _router: Router) {
    this.documentoServices.getDocumentos().subscribe(res => {
      this.documentos = res;
    });
    this.estudianteCodigo = this.navParams.get('estudianteCodigo');
    this.estudianteServices.getEstudiante(this.estudianteCodigo).subscribe(res => {
      this.estudiante = <Estudiante>res;
    });
  }

  ngOnInit() {

  }

  closePopOver() {
    this.popoverController.dismiss();
  }

  async addDocumento(documento: IDocumento) {

    const loading = await this.loadingController.create({
      message: 'Actualizando documentos...',
      spinner: 'circles'
    });

    await loading.present();

    this.estudiante.documentos.push(documento);
    this.estudianteServices.updateEstudiante(this.estudiante, this.estudianteCodigo);
    loading.dismiss();
    this.closePopOver();
  }
}
