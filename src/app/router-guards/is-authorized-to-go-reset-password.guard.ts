import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoutingService } from '../services/routing.service';


export const isAuthorizedToGoResetPassword: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const routingService = inject(RoutingService);
  routingService.loadPreviousUrl();
  const userEmail = localStorage.getItem('userEmail');


  if (!userEmail) {
    router.navigateByUrl(routingService.url);
    return false;
  } else {
    localStorage.removeItem('userEmail');
    return true;
  }
};
