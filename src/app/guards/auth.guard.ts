import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs';

// Só deixa entrar quem fez login
export const somenteLogado: CanActivateFn = () => {
  const router = inject(Router);

  return authState(inject(Auth)).pipe(
    take(1),
    map(usuario => usuario ? true : router.parseUrl('/login'))
  );
};

// Login e cadastro: quem já está logado vai direto para o início
export const somenteVisitante: CanActivateFn = () => {
  const router = inject(Router);

  return authState(inject(Auth)).pipe(
    take(1),
    map(usuario => usuario ? router.parseUrl('/inicio') : true)
  );
};
