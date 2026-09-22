import { Component, OnInit } from '@angular/core';

interface Instituicao {
  nome: string;
  descricao: string;
  link: string;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: false,
})
export class CursosPage implements OnInit {

  instituicoes: Instituicao[] = [

    {
      nome: 'Fundação Bradesco',
      descricao: 'Cursos gratuitos online com certificado em áreas como administração, tecnologia e desenvolvimento profissional.',
      link: 'https://www.ev.org.br/cursos'
    },

    {
      nome: 'SENAI',
      descricao: 'Cursos gratuitos e profissionalizantes para aprender novas habilidades e se preparar para o mercado de trabalho.',
      link: 'https://www.sp.senai.br/noticia/conheca-os-cursos-livres-gratuitos-do-senai-sp'
    },

    {
      nome: 'Sebrae',
      descricao: 'Cursos sobre empreendedorismo, carreira, marketing, finanças e desenvolvimento profissional.',
      link: 'https://loja.sebrae.com.br/cursos/cursos-online'
    },

    {
      nome: 'Senac',
      descricao: 'Cursos livres, técnicos e outras oportunidades de formação em diferentes áreas profissionais.',
      link: 'https://www.ead.senac.br/cursos-por-area/'
    }

  ];

  instituicoesFiltradas: Instituicao[] = [];

  pesquisa = '';

  constructor() {}

  ngOnInit() {
    this.instituicoesFiltradas = [...this.instituicoes];
  }

  pesquisar() {

    const texto = this.pesquisa.toLowerCase().trim();

    this.instituicoesFiltradas = this.instituicoes.filter(instituicao =>
      instituicao.nome.toLowerCase().includes(texto) ||
      instituicao.descricao.toLowerCase().includes(texto)
    );

  }

}