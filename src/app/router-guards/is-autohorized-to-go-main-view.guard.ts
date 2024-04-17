import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const isAutohorizedToGoMainViewGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedinUserAsString = localStorage.getItem('loggedinUser');
  let loggedinUser;


  if (loggedinUserAsString) {
    loggedinUser = JSON.parse(loggedinUserAsString);
  }


  if (loggedinUser.displayName == '' && loggedinUser.email == '') {
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
