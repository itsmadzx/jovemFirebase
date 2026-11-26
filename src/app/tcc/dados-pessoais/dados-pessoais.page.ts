import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ToastController } from '@ionic/angular/lazy';

import { Usuario, UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
  standalone: false,
})
export class DadosPessoaisPage {

  private usuarioService = inject(UsuarioService);
  private toastController = inject(ToastController);
  private cdr = inject(ChangeDetectorRef);

  dados: Usuario = this.usuarioService.dadosBasicos();
  carregando = true;
  salvando = false;
  erroCarregar = false;

  async ionViewWillEnter() {
    this.dados = this.usuarioService.dadosBasicos();
    this.carregando = true;
    this.erroCarregar = false;
    this.cdr.detectChanges();

    try {
      this.dados = await this.usuarioService.obterPerfil();
    } catch (erro) {
      console.error('Erro ao carregar perfil:', erro);
      this.erroCarregar = true;
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  async salvar() {
    if (this.salvando || this.carregando || this.erroCarregar) {
      return;
    }

    if (this.dados.nome.trim().length < 3) {
      await this.avisar('Digite seu nome completo.', 'warning');
      return;
    }

    this.salvando = true;

    try {
      await this.usuarioService.salvarPerfil(this.dados);
      await this.avisar('Dados salvos com sucesso.', 'success');
    } catch (erro) {
      console.error('Erro ao salvar perfil:', erro);
      await this.avisar('Não foi possível confirmar o salvamento. Tente novamente.', 'danger');
    } finally {
      this.salvando = false;
      this.cdr.detectChanges();
    }
  }

  private async avisar(message: string, color: string) {
    const toast = await this.toastController.create({ message, color, duration: 2500 });
    await toast.present();
  }

}
