import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular/lazy';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../cadastro/cadastro.page.scss', './login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email = '';
  senha = '';
  mostrarSenha = false;

  erro = '';
  aviso = '';
  carregando = false;

  private usuarioService = inject(UsuarioService);
  private nav = inject(NavController);
  private cdr = inject(ChangeDetectorRef);

  ionViewWillEnter() {
    this.email = this.senha = this.erro = this.aviso = '';
    this.mostrarSenha = false;
    this.cdr.detectChanges();
  }

  async entrar() {
    if (this.carregando) {
      return;
    }

    this.erro = this.aviso = '';

    if (!this.email.trim() || !this.senha) {
      this.erro = 'Digite seu e-mail e sua senha.';
      return;
    }

    this.carregando = true;

    try {
      await this.usuarioService.entrar(this.email.trim(), this.senha);
      this.senha = '';
      await this.nav.navigateRoot('/inicio');
    } catch (error: any) {
      console.error('Erro ao entrar:', error);
      this.erro = this.traduzirErro(error?.code);
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  async esqueciSenha() {
    this.erro = this.aviso = '';

    if (!this.email.trim()) {
      this.erro = 'Digite seu e-mail para recuperar a senha.';
      return;
    }

    try {
      await this.usuarioService.recuperarSenha(this.email.trim());
      this.aviso = 'Se houver uma conta com este e-mail, você receberá um link para criar uma nova senha.';
    } catch (error: any) {
      console.error('Erro ao recuperar senha:', error);
      this.erro = this.traduzirErro(error?.code);
    } finally {
      this.cdr.detectChanges();
    }
  }

  criarConta() {
    this.nav.navigateForward('/cadastro');
  }

  private traduzirErro(codigo?: string): string {
    switch (codigo) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou senha incorretos.';
      case 'auth/invalid-email':
        return 'Digite um e-mail válido.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
      case 'auth/network-request-failed':
        return 'Sem conexão. Verifique sua internet.';
      case 'auth/operation-not-allowed':
      case 'auth/configuration-not-found':
        return 'O login por e-mail e senha não está ativado no Firebase.';
      default:
        return `Não foi possível concluir (${codigo ?? 'erro desconhecido'}).`;
    }
  }

}
