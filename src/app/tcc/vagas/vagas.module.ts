import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { VagasPageRoutingModule } from './vagas-routing.module';

import { VagasPage } from './vagas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VagasPageRoutingModule
  ],
  declarations: [VagasPage]
})
export class VagasPageModule {}
