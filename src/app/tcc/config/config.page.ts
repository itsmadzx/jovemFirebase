import { Component, inject } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular/lazy';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: false,
})
export class ConfigPage {

  notificacoes = true;

  private usuarioService = inject(UsuarioService);
  private nav = inject(NavController);

  constructor(private toastController: ToastController) {}

  async alterarSenha() {
    try {
      await this.usuarioService.recuperarSenha(this.usuarioService.dadosBasicos().email);
      await this.avisar('Enviamos um link para o seu e-mail para alterar a senha.', 'success');
    } catch (erro) {
      console.error('Erro ao alterar senha:', erro);
      await this.avisar('Não foi possível enviar o e-mail. Tente novamente.', 'danger');
    }
  }

  async salvarAlteracao(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: 'success'
    });

    await toast.present();
  }

  async sair() {
    try {
      await this.usuarioService.sair();
      await this.nav.navigateRoot('/login');
      await this.avisar('Você saiu da sua conta.', 'primary');
    } catch (erro) {
      console.error('Erro ao sair:', erro);
      await this.avisar('Não foi possível sair. Tente novamente.', 'danger');
    }
  }

  private async avisar(message: string, color: string) {
    const toast = await this.toastController.create({ message, color, duration: 2500 });
    await toast.present();
  }

}
