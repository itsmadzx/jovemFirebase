import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { DadosPessoaisPageRoutingModule } from './dados-pessoais-routing.module';

import { DadosPessoaisPage } from './dados-pessoais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadosPessoaisPageRoutingModule
  ],
  declarations: [DadosPessoaisPage]
})
export class DadosPessoaisPageModule {}
