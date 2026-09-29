import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

import { app } from '../../firebase.config';


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


  constructor(
    private router: Router
  ) {}


  async criarConta() {

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

      const auth = getAuth(app);


      const credencial =
        await createUserWithEmailAndPassword(
          auth,
          this.email.trim(),
          this.senha
        );


      // Salva o nome do usuário no Firebase
      await updateProfile(
        credencial.user,
        {
          displayName: this.nome.trim()
        }
      );


      console.log(
        'Conta criada com sucesso!',
        credencial.user
      );


      // Só chega aqui se a conta realmente foi criada
      await this.router.navigate(['/inicio']);


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

    }

  }


  // =========================
  // VOLTAR PARA LOGIN
  // =========================

  voltarParaLogin() {

    this.router.navigate(['/home']);

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
