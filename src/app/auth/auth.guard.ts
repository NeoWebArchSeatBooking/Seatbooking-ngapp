import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {

  const router = inject(Router);
  const authService = inject(AuthService);
  console.log(window.location.pathname);

  if(authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};