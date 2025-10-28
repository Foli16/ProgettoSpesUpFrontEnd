import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const loggedGuard: CanActivateFn = (route, state) =>
{
  //constructor(private router:Router)
  let router = inject(Router);
  let serv = inject(AuthService);


  if(serv.userInformation)//è loggato
  {
    return true;
  }
  else
  {
    //non loggato
    router.navigate(['/login']);//lo spedisco al login
    return false;//blocco accesso
  }


};
