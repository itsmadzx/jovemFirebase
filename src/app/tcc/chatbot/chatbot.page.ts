import { Component, OnInit } from '@angular/core';

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

  mensagens: Mensagem[] = [
    {
      texto: 'Olá! 👋 Eu sou o Estagiário, assistente de IA do Impulso Jovem. Como posso te ajudar hoje?',
      tipo: 'ia',
      horario: this.obterHorario()
    }
  ];

  enviarMensagem(): void {
    const texto = this.mensagemAtual.trim();

    if (!texto) {
      return;
    }

    this.mensagens.push({
      texto: texto,
      tipo: 'usuario',
      horario: this.obterHorario()
    });

    this.mensagemAtual = '';

    // resposta temporária da IA. depois vamos substituir isso pela Firebase Function.
    setTimeout(() => {
      this.mensagens.push({
        texto: 'Entendi! Em breve vou conseguir responder sua pergunta usando a inteligência artificial do Impulso Jovem. 🤖',
        tipo: 'ia',
        horario: this.obterHorario()
      });
    }, 500);
  }

  obterHorario(): string {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}