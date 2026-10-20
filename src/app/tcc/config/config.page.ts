import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: false,
})
export class ConfigPage {

  notificacoes = true;

  constructor(private toastController: ToastController) {}
  async salvarAlteracao(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: 'success'
    });

    await toast.present();
  }

  async sair() {
    const toast = await this.toastController.create({
      message: 'Você saiu da sua conta.',
      duration: 2000,
      color: 'primary'
    });

    await toast.present();
  }

}
