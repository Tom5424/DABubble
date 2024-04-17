import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const isAutohorizedToGoMainViewGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  if (authService.user.name == '' && authService.user.email == '') {
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
