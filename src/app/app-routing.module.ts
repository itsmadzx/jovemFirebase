import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'item-detail/:id', //rota para editar item existente
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./tcc/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'vagas',
    loadChildren: () => import('./tcc/vagas/vagas.module').then( m => m.VagasPageModule)
  },  {
    path: 'vocacional',
    loadChildren: () => import('./tcc/vocacional/vocacional.module').then( m => m.VocacionalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
