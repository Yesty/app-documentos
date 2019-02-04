import { IDocumento, DocumentosService } from './../../services/documentos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  documentos: any[];

  constructor(private documentoServices: DocumentosService, private _router: Router) {
    this.documentoServices.getDocumentos().subscribe(res => {
      this.documentos = res;
    });
  }

  ngOnInit(): void {

  }

  remove(item) {
    this.documentoServices.deleteDocumento(item.id);
  }

  // Métodos
  edit(item) {
    this._router.navigate(['/dashboard', 'detalle-documento', item.id]);
  }

  sharedItem(termino: string) {
    console.log(this.documentos);
  }

  reloadItem() {
    this.documentoServices.getDocumentos().subscribe(res => {
      this.documentos = res;
    });
  }
}

