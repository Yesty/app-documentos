import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  codigoEstudiante: string;
  documentoEstudiante: string;
  constructor(
    private authenticationServices: AuthenticationService,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async login() {
    if (this.codigoEstudiante && this.documentoEstudiante) {
      this.authenticationServices.login(this.codigoEstudiante, this.documentoEstudiante);
    } else {
      const toast = await this.toastController.create({
        message: 'Codigo y/o Documento incorrectos',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  }
}
