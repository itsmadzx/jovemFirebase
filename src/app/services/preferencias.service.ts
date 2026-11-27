import { Injectable, inject, signal } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

export type Tema = 'claro' | 'penumbra' | 'escuro';

export interface Preferencias {
  tema: Tema;
  escalaFonte: number;
}

export const ESCALA_MINIMA = 0.8;
export const ESCALA_MAXIMA = 1.5;

const PADRAO: Preferencias = { tema: 'claro', escalaFonte: 1 };
const CHAVE = 'impulso-preferencias';

// Garante valores válidos, venham do aparelho ou do banco
function validar(dados: Partial<Preferencias> | undefined): Preferencias {
  const tema = dados?.tema;
  const escala = Number(dados?.escalaFonte) || 1;

  return {
    tema: tema === 'penumbra' || tema === 'escuro' ? tema : 'claro',
    escalaFonte: Math.min(ESCALA_MAXIMA, Math.max(ESCALA_MINIMA, escala))
  };
}

@Injectable({
  providedIn: 'root'
})
export class PreferenciasService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  readonly atual = signal<Preferencias>(this.lerDoAparelho());
  readonly aviso = signal('');

  private versao = 0;
  private entrouAlguem = false;
  private espera?: ReturnType<typeof setTimeout>;

  constructor() {
    this.aplicar(this.atual());

    authState(this.auth).subscribe(usuario => {
      if (usuario) {
        this.entrouAlguem = true;
        this.carregarDaConta(usuario.uid);
      } else if (this.entrouAlguem) {
        // Saiu da conta: a próxima pessoa não herda as preferências
        this.entrouAlguem = false;
        this.versao++;
        this.aviso.set('');
        this.aplicar(PADRAO);
      }
    });
  }

  alterar(mudanca: Partial<Preferencias>): void {
    this.versao++;
    this.aviso.set('');
    this.aplicar(validar({ ...this.atual(), ...mudanca }));

    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      return;
    }

    // Espera a pessoa terminar de ajustar antes de gravar
    const preferencias = this.atual();
    clearTimeout(this.espera);
    this.espera = setTimeout(() => {
      setDoc(doc(this.firestore, `usuarios/${uid}`), { preferencias }, { merge: true })
        .catch(erro => {
          console.error('Erro ao salvar preferências:', erro);
          this.aviso.set('Não foi possível salvar na sua conta.');
        });
    }, 500);
  }

  private async carregarDaConta(uid: string): Promise<void> {
    const versao = this.versao;

    try {
      const registro = await getDoc(doc(this.firestore, `usuarios/${uid}`));

      // Ignora se a pessoa mudou algo ou trocou de conta enquanto carregava
      if (versao === this.versao && this.auth.currentUser?.uid === uid) {
        this.aplicar(validar(registro.data()?.['preferencias']));
      }
    } catch (erro) {
      console.error('Erro ao carregar preferências:', erro);
    }
  }

  private aplicar(preferencias: Preferencias): void {
    this.atual.set(preferencias);

    const raiz = document.documentElement;
    const escuro = preferencias.tema !== 'claro';

    raiz.classList.toggle('ion-palette-dark', escuro);
    raiz.classList.toggle('tema-escuro', preferencias.tema === 'escuro');
    raiz.classList.toggle('tema-penumbra', preferencias.tema === 'penumbra');
    raiz.classList.toggle('letra-grande', preferencias.escalaFonte > 1);
    raiz.style.colorScheme = escuro ? 'dark' : 'light';
    raiz.style.setProperty('--escala-fonte', String(preferencias.escalaFonte));

    try {
      localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch {
      // armazenamento indisponível: segue sem a cópia no aparelho
    }
  }

  private lerDoAparelho(): Preferencias {
    try {
      return validar(JSON.parse(localStorage.getItem(CHAVE) ?? '{}'));
    } catch {
      return PADRAO;
    }
  }
}
