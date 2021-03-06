import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './account/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './account/register/register.module#RegisterPageModule' },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: './dashboard/dashboard-routing.module#DashboardRoutingModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
