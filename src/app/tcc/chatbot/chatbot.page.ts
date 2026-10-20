import { Component } from '@angular/core';
import { IaService } from '../services/ia';

interface Mensagem {
  texto: string;
  tipo: 'ia' | 'usuario';
  horario: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
  standalone: false
})
export class ChatbotPage {

  mensagemAtual = '';
  iaDigitando = false;

  mensagens: Mensagem[] = [
    {
      texto: 'Olá! 👋 Eu sou o assistente do Impulso Jovem. Como posso te ajudar hoje?',
      tipo: 'ia',
      horario: this.obterHorario()
    }
  ];

  constructor(private iaService: IaService) {}

  enviarMensagem(): void {
    const texto = this.mensagemAtual.trim();

    if (!texto || this.iaDigitando) {
      return;
    }

    this.mensagens.push({
      texto,
      tipo: 'usuario',
      horario: this.obterHorario()
    });

    this.mensagemAtual = '';
    this.iaDigitando = true;

    // Temporariamente continua usando uma resposta simulada.
    setTimeout(() => {
      this.mensagens.push({
        texto: 'Entendi! Em breve vou conseguir responder sua pergunta usando a inteligência artificial do Impulso Jovem. 🤖',
        tipo: 'ia',
        horario: this.obterHorario()
      });

      this.iaDigitando = false;
    }, 1000);
  }

  obterHorario(): string {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}