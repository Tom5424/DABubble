import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const isAuthorizedToGoAvatarpicker: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.loadFormDataSignupFormService();


  if (authService.user.name == '' && authService.user.email == '' && authService.user.password == '') {
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
