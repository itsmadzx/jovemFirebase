import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';

// Dados cadastrais salvos em usuarios/{uid}. A senha fica só no Firebase Authentication.
export interface Usuario {
  nome: string;
  nomeUsuario: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  dataNascimento: string;
}

const TEMPO_LIMITE = 10000;

// Evita que a tela fique carregando para sempre se o Firestore não responder
function comTempoLimite<T>(promessa: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const relogio = setTimeout(() => reject(new Error('tempo-esgotado')), TEMPO_LIMITE);
    promessa.then(resolve, reject).finally(() => clearTimeout(relogio));
  });
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async cadastrar(nome: string, email: string, senha: string): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, senha);

    // A conta já existe neste ponto. Se o perfil falhar, a pessoa
    // pode salvá-lo depois na tela "Dados pessoais".
    try {
      await updateProfile(user, { displayName: nome });
      await comTempoLimite(setDoc(doc(this.firestore, `usuarios/${user.uid}`), {
        nome,
        email,
        criadoEm: serverTimestamp()
      }));
    } catch (erro) {
      console.error('Conta criada, mas o perfil não foi salvo:', erro);
    }
  }

  async entrar(email: string, senha: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, senha);
  }

  recuperarSenha(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  sair(): Promise<void> {
    return signOut(this.auth);
  }

  // Dados que o próprio login já conhece (não depende do Firestore)
  dadosBasicos(): Usuario {
    const user = this.auth.currentUser;

    return {
      nome: user?.displayName ?? '',
      nomeUsuario: '',
      email: user?.email ?? '',
      telefone: '',
      cidade: '',
      estado: '',
      dataNascimento: ''
    };
  }

  async obterPerfil(): Promise<Usuario> {
    await this.auth.authStateReady();

    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('sem-login');
    }

    const registro = await comTempoLimite(getDoc(doc(this.firestore, `usuarios/${user.uid}`)));
    const basicos = this.dadosBasicos();

    return {
      ...basicos,
      ...(registro.data() as Partial<Usuario> | undefined),
      email: basicos.email
    };
  }

  async salvarPerfil(dados: Usuario): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('sem-login');
    }

    await comTempoLimite(setDoc(
      doc(this.firestore, `usuarios/${user.uid}`),
      {
        nome: dados.nome.trim(),
        nomeUsuario: dados.nomeUsuario.trim(),
        email: user.email ?? '',
        telefone: dados.telefone.trim(),
        cidade: dados.cidade.trim(),
        estado: dados.estado.trim().toUpperCase(),
        dataNascimento: dados.dataNascimento,
        atualizadoEm: serverTimestamp()
      },
      { merge: true }
    ));

    await updateProfile(user, { displayName: dados.nome.trim() });
  }
}
