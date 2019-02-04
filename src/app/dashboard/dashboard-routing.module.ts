import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
  { path: 'estudiantes', loadChildren: './estudiantes/estudiantes.module#EstudiantesPageModule' },
  { path: 'estudiantes/:id', loadChildren: './estudiantes/estudiantes.module#EstudiantesPageModule' },
  { path: 'detalle-estudiante/:id', loadChildren: './detalle-estudiante/detalle-estudiante.module#DetalleEstudiantePageModule' },
  { path: 'documentos', loadChildren: './documentos/documentos.module#DocumentosPageModule' },
  { path: 'detalle-documento', loadChildren: './detalle-documento/detalle-documento.module#DetalleDocumentoPageModule' },
  { path: 'detalle-documento/:id', loadChildren: './detalle-documento/detalle-documento.module#DetalleDocumentoPageModule' },
  { path: 'pop-over', loadChildren: './pop-over/pop-over.module#PopOverPageModule' },
  { path: 'venta-modal', loadChildren: './venta-modal/venta-modal.module#VentaModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
