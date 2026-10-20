import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { CurriculoPageRoutingModule } from './curriculo-routing.module';
import { CurriculoPage } from './curriculo.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurriculoPageRoutingModule ,
    ReactiveFormsModule
  ],
  declarations: [CurriculoPage]
})
export class CurriculoPageModule {}
