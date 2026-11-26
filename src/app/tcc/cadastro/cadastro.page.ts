import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular/lazy';

import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage {

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  mostrarSenha = false;
  mostrarConfirmarSenha = false;

  erro = '';
  carregando = false;


  private usuarioService = inject(UsuarioService);
  private nav = inject(NavController);
  private cdr = inject(ChangeDetectorRef);


  // Limpa o formulário sempre que a tela é aberta
  ionViewWillEnter() {

    this.nome = this.email = this.senha = this.confirmarSenha = this.erro = '';
    this.mostrarSenha = this.mostrarConfirmarSenha = false;
    this.cdr.detectChanges();

  }


  async criarConta() {

    if (this.carregando) {
      return;
    }

    // Limpa erro anterior
    this.erro = '';


    // =========================
    // VALIDAÇÕES
    // =========================

    if (!this.nome.trim()) {

      this.erro = 'Digite seu nome completo.';
      return;

    }


    if (!this.email.trim()) {

      this.erro = 'Digite seu e-mail.';
      return;

    }


    if (!this.senha) {

      this.erro = 'Digite uma senha.';
      return;

    }


    if (!this.confirmarSenha) {

      this.erro = 'Confirme sua senha.';
      return;

    }


    if (this.senha !== this.confirmarSenha) {

      this.erro = 'As senhas não são iguais.';
      return;

    }


    if (this.senha.length < 6) {

      this.erro =
        'A senha deve ter pelo menos 6 caracteres.';

      return;

    }


    // =========================
    // CRIAR CONTA NO FIREBASE
    // =========================

    this.carregando = true;


    try {

      await this.usuarioService.cadastrar(
        this.nome.trim(),
        this.email.trim(),
        this.senha
      );

      // Só chega aqui se a conta realmente foi criada
      await this.nav.navigateRoot('/inicio');


    } catch (error: any) {

      console.error(
        'Erro ao criar conta:',
        error
      );


      // =========================
      // ERROS DO FIREBASE
      // =========================

      if (error.code === 'auth/email-already-in-use') {

        this.erro =
          'Este e-mail já possui uma conta.';

      }

      else if (error.code === 'auth/invalid-email') {

        this.erro =
          'Digite um e-mail válido.';

      }

      else if (error.code === 'auth/weak-password') {

        this.erro =
          'A senha é muito fraca.';

      }

      else {

        this.erro =
          'Não foi possível criar a conta. Tente novamente.';

      }

    }


    finally {

      this.carregando = false;
      this.cdr.detectChanges();

    }

  }


  // =========================
  // VOLTAR PARA LOGIN
  // =========================

  voltarParaLogin() {

    this.nav.navigateRoot('/login');

  }


  // =========================
  // MOSTRAR / ESCONDER SENHA
  // =========================

  alternarSenha() {

    this.mostrarSenha =
      !this.mostrarSenha;

  }


  alternarConfirmarSenha() {

    this.mostrarConfirmarSenha =
      !this.mostrarConfirmarSenha;

  }

}
