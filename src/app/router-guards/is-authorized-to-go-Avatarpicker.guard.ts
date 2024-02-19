import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutingService } from '../services/routing.service';


export const isAuthorizedToGoAvatarpicker: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routingService = inject(RoutingService);
  const router = inject(Router);
  routingService.loadPreviousUrl();
  authService.loadFormDataSignupFormService();


  if (authService.user.name == '' && authService.user.email == '' && authService.user.password == '') {
    router.navigateByUrl(routingService.url);
    return false;
  } else {
    return true;
  }
};
