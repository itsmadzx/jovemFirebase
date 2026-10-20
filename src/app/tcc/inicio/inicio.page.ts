import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit, OnDestroy {

  slideAtual = 0;

  slides = [
    {
      titulo: 'Dê um impulso<br>no seu futuro',
      descricao: 'Aqui você encontra o apoio certo para construir a carreira que deseja.',
      botao: 'Começar agora'
    },
    {
      titulo: 'Aprenda algo<br>novo',
      descricao: 'Encontre cursos gratuitos e desenvolva novas habilidades.',
      botao: 'Ver cursos'
    },
    {
      titulo: 'Encontre seu<br>primeiro emprego',
      descricao: 'Descubra oportunidades de estágio e jovem aprendiz.',
      botao: 'Ver vagas'
    },
    {
      titulo: 'Descubra seu<br>potencial',
      descricao: 'Conheça suas habilidades e encontre caminhos para o seu futuro.',
      botao: 'Fazer teste'
    }
  ];

  private intervalo: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.iniciarCarrossel();
  }

  iniciarCarrossel() {
    this.intervalo = setInterval(() => {

      this.slideAtual++;

      if (this.slideAtual >= this.slides.length) {
        this.slideAtual = 0;
      }

      this.cdr.detectChanges();

    }, 4000);
  }

  irParaSlide(index: number) {

    this.slideAtual = index;

    this.cdr.detectChanges();

    clearInterval(this.intervalo);

    this.iniciarCarrossel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  abrirCurso1() {
    window.open(
      'https://www.ev.org.br/cursos/AI900Azure',
      '_blank'
    );
  }

  abrirCIEE() {
    window.open(
      'https://portal.ciee.org.br/',
      '_blank'
    );
  }

  notificacoesAberta = false;

    abrirNotificacoes() {
      this.notificacoesAberta = true;
    }

    fecharNotificacoes() {
      this.notificacoesAberta = false;
    }
    
}