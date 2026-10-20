import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RespostaIA {
  resposta: string;
}

@Injectable({
  providedIn: 'root'
})
export class IaService {

  private functionUrl = '';

  constructor(private http: HttpClient) {}

  enviarMensagem(mensagem: string): Observable<RespostaIA> {
    return this.http.post<RespostaIA>(
      this.functionUrl,
      { mensagem }
    );
  }
}