import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { somenteLogado, somenteVisitante } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [somenteVisitante],
    loadChildren: () => import('./tcc/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    canActivate: [somenteVisitante],
    loadChildren: () => import('./tcc/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'inicio',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'dados-pessoais',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/dados-pessoais/dados-pessoais.module').then( m => m.DadosPessoaisPageModule)
  },
  {
    path: 'home',
    canActivate: [somenteLogado],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'item-detail',
    canActivate: [somenteLogado],
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'item-detail/:id', //rota para editar item existente
    canActivate: [somenteLogado],
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'cursos',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'vagas',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/vagas/vagas.module').then( m => m.VagasPageModule)
  },
  {
    path: 'vocacional',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/vocacional/vocacional.module').then( m => m.VocacionalPageModule)
  },
  {
    path: 'perfil',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'config',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'curriculo',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/curriculo/curriculo.module').then( m => m.CurriculoPageModule)
  },
  {
    path: 'chatbot',
    canActivate: [somenteLogado],
    loadChildren: () => import('./tcc/chatbot/chatbot.module').then( m => m.ChatbotPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
