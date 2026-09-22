import { Component, OnInit } from '@angular/core';

interface Plataforma {
  nome: string;
  descricao: string;
  link: string;
}

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.page.html',
  styleUrls: ['./vagas.page.scss'],
  standalone: false,
})
export class VagasPage implements OnInit {

  plataformas: Plataforma[] = [
    {
      nome: 'CIEE',
      descricao: 'Encontre oportunidades de estágio e jovem aprendiz para iniciar sua carreira.',
      link: 'https://portal.ciee.org.br/'
    },
    {
      nome: 'Nube',
      descricao: 'Encontre vagas de estágio, jovem aprendiz e trainee para estudantes.',
      link: 'https://www.nube.com.br/'
    },
    {
      nome: 'Catho',
      descricao: 'Encontre oportunidades de emprego e estágio em diferentes áreas.',
      link: 'https://www.catho.com.br/'
    },
    {
      nome: 'Gupy',
      descricao: 'Confira processos seletivos e oportunidades em diversas empresas.',
      link: 'https://portal.gupy.io/'
    }
  ];

  plataformasFiltradas: Plataforma[] = [];
  pesquisa = '';

  constructor() {}

  ngOnInit() {
    this.plataformasFiltradas = [...this.plataformas];
  }

  pesquisar() {
    const texto = this.pesquisa.toLowerCase().trim();

    this.plataformasFiltradas = this.plataformas.filter(plataforma =>
      plataforma.nome.toLowerCase().includes(texto) ||
      plataforma.descricao.toLowerCase().includes(texto)
    );
  }

}
