import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleDocumentoPage } from './detalle-documento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDocumentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleDocumentoPage]
})
export class DetalleDocumentoPageModule {}
