import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'estudiantes', loadChildren: './pages/estudiantes/estudiantes.module#EstudiantesPageModule' },
  { path: 'estudiantes/:id', loadChildren: './pages/estudiantes/estudiantes.module#EstudiantesPageModule' },
  { path: 'detalle-estudiante/:id', loadChildren: './pages/detalle-estudiante/detalle-estudiante.module#DetalleEstudiantePageModule' },
  { path: 'documentos', loadChildren: './pages/documentos/documentos.module#DocumentosPageModule' },
  { path: 'detalle-documento', loadChildren: './pages/detalle-documento/detalle-documento.module#DetalleDocumentoPageModule' },
  { path: 'detalle-documento/:id', loadChildren: './pages/detalle-documento/detalle-documento.module#DetalleDocumentoPageModule' },
  { path: 'pop-over', loadChildren: './pages/pop-over/pop-over.module#PopOverPageModule' },
  { path: 'venta-modal', loadChildren: './pages/venta-modal/venta-modal.module#VentaModalPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
