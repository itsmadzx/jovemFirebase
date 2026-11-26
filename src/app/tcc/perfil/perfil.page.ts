import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {

  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);

  selectedTab: string = 'cursos';
  nome = '';
  email = '';

  async ionViewWillEnter() {
    this.mostrar(this.usuarioService.dadosBasicos());

    try {
      this.mostrar(await this.usuarioService.obterPerfil());
    } catch (erro) {
      console.error('Erro ao carregar perfil:', erro);
    }
  }

  private mostrar(dados: { nome: string; email: string }) {
    this.nome = dados.nome;
    this.email = dados.email;
    this.cdr.detectChanges();
  }

}
