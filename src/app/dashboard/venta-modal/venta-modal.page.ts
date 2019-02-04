import { NavParams, ModalController, IonItemSliding } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Estudiante, EstudiantesService } from 'src/app/services/estudiantes.service';
import { IDocumento, DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-venta-modal',
  templateUrl: './venta-modal.page.html',
  styleUrls: ['./venta-modal.page.scss'],
})
export class VentaModalPage implements OnInit {

  estudianteCodigo: string;
  estudiante: Estudiante;
  documentos: any[];
  documentosEstudiante: IDocumento[];
  loadingController: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private estudianteServices: EstudiantesService,
    private documentoServices: DocumentosService
  ) {
    this.documentosEstudiante = new Array<IDocumento>();

    this.documentoServices.getDocumentos().subscribe(res => {
      this.documentos = res;

      this.estudianteCodigo = this.navParams.get('estudianteCodigo');
      this.estudianteServices.getEstudiante(this.estudianteCodigo).subscribe(result => {
        this.estudiante = <Estudiante>result;

        this.documentos.forEach(doc => {
          const estado = this.estudiante.documentos.filter(s => s.descripcion == (<IDocumento>doc).descripcion);
          if (estado.length == 0) {
            this.documentosEstudiante.push(doc);
          }
        });
      });

    });
  }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }

  addDocumento(documento: IDocumento) {
    console.log(documento);
    this.estudiante.documentos.push(documento);
    this.estudianteServices.updateEstudiante(this.estudiante, this.estudianteCodigo);
    this.closeModal();
  }
}
