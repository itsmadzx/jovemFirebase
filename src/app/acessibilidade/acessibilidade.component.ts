import { Component, HostListener, inject, signal } from '@angular/core';

import {
  ESCALA_MAXIMA,
  ESCALA_MINIMA,
  PreferenciasService,
  Tema
} from '../services/preferencias.service';

@Component({
  selector: 'app-acessibilidade',
  templateUrl: './acessibilidade.component.html',
  styleUrls: ['./acessibilidade.component.scss'],
  standalone: false,
})
export class AcessibilidadeComponent {

  preferencias = inject(PreferenciasService);
  aberto = signal(false);

  readonly minima = ESCALA_MINIMA;
  readonly maxima = ESCALA_MAXIMA;

  readonly temas: { valor: Tema; nome: string }[] = [
    { valor: 'claro', nome: 'Claro' },
    { valor: 'penumbra', nome: 'Penumbra' },
    { valor: 'escuro', nome: 'Escuro' }
  ];

  porcentagem(): number {
    return Math.round(this.preferencias.atual().escalaFonte * 100);
  }

  mudarFonte(passo: number): void {
    this.preferencias.alterar({ escalaFonte: (this.porcentagem() + passo) / 100 });
  }

  @HostListener('document:keydown.escape')
  fechar(): void {
    this.aberto.set(false);
  }
}
