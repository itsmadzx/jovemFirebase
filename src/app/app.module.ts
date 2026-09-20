import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular/lazy';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//importações do SDK Modular do Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'; //função para inicializar o app Firebase
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; //funções para o Firestore

import { environment } from '../environments/environment'; //suas configurações do ambiente


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    //provisão do firestore
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
