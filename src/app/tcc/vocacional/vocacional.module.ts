import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { VocacionalPageRoutingModule } from './vocacional-routing.module';

import { VocacionalPage } from './vocacional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocacionalPageRoutingModule
  ],
  declarations: [VocacionalPage]
})
export class VocacionalPageModule {}
