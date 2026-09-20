import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VagasPage } from './vagas.page';

const routes: Routes = [
  {
    path: '',
    component: VagasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VagasPageRoutingModule {}
