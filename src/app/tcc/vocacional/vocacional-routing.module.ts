import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocacionalPage } from './vocacional.page';

const routes: Routes = [
  {
    path: '',
    component: VocacionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocacionalPageRoutingModule {}
