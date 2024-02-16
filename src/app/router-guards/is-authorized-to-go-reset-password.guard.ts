import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const isAuthorizedToGoResetPassword: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userEmail = localStorage.getItem('userEmail');


  if (!userEmail) {
    router.navigateByUrl('/login');
    return false;
  } else {
    localStorage.removeItem('userEmail');
    return true;
  }
};
