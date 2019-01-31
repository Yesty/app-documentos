import { IDocumento, DocumentosService } from './../../services/documentos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-documento',
  templateUrl: './detalle-documento.page.html',
  styleUrls: ['./detalle-documento.page.scss'],
})
export class DetalleDocumentoPage implements OnInit {

  documento: IDocumento = {
    codigo: 0,
    descripcion: '',
    tipo: '',
    estado: false,
    fechaCreacion: 0,
  };

  documentoCodigo: string = null;
  constructor(private documentoService: DocumentosService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController) { }

  ngOnInit() {
    this.documentoCodigo = this.route.snapshot.params['id'];

    if (this.documentoCodigo) {
      this.loadDocumento();
    }
  }

  async loadDocumento() {

    const loading = await this.loadingController.create({
      message: 'Cargando documento...',
      spinner: 'circles'
    });

    await loading.present();

    this.documentoService.getDocumento(this.documentoCodigo).subscribe(res => {
      loading.dismiss();
      this.documento = <IDocumento>res;
    });
  }

  async saveDocumento() {
    const loading = await this.loadingController.create({
      message: 'Cargando documento...',
      spinner: 'circles'
    });

    await loading.present();

    if (this.documentoCodigo) {
      this.documentoService.updateDocumento(this.documento, this.documentoCodigo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('documentos');
      });
    } else {
      this.documento.fechaCreacion = new Date().getTime();
      this.documentoService.addDocumento(this.documento).then(() => {
        loading.dismiss();
        this.nav.navigateBack('documentos');
      });
    }
  }

}
