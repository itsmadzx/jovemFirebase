import { Component } from '@angular/core';

interface Pergunta {
  pergunta: string;
  alternativas: string[];
}

@Component({
  selector: 'app-vocacional',
  templateUrl: './vocacional.page.html',
  styleUrls: ['./vocacional.page.scss'],
  standalone: false,
})
export class VocacionalPage {

  perguntas: Pergunta[] = [
    {
      pergunta: 'Qual atividade você mais gostaria de fazer?',
      alternativas: [
        'Criar e desenvolver coisas',
        'Resolver problemas e analisar informações',
        'Ajudar e trabalhar com pessoas',
        'Criar ideias e projetos'
      ]
    },
    {
      pergunta: 'Em um trabalho, o que mais chama sua atenção?',
      alternativas: [
        'Tecnologia e inovação',
        'Organização e planejamento',
        'Comunicação e relacionamento',
        'Criatividade e liberdade'
      ]
    },
    {
      pergunta: 'Qual dessas atividades combina mais com você?',
      alternativas: [
        'Programar ou mexer com tecnologia',
        'Analisar dados e encontrar soluções',
        'Trabalhar em equipe e ajudar pessoas',
        'Criar conteúdos ou projetos'
      ]
    }
  ];

  perguntaAtual = 0;
  testeFinalizado = false;
  respostaSelecionada = '';

  selecionarResposta(resposta: string) {
    this.respostaSelecionada = resposta;
  }

  continuar() {
    if (!this.respostaSelecionada) {
      return;
    }

    if (this.perguntaAtual < this.perguntas.length - 1) {
      this.perguntaAtual++;
      this.respostaSelecionada = '';
    } else {
      this.testeFinalizado = true;
    }
  }

  reiniciarTeste() {
    this.perguntaAtual = 0;
    this.testeFinalizado = false;
    this.respostaSelecionada = '';
  }

}
