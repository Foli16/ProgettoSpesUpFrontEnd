import { Routes } from '@angular/router';
import {Register} from './register/register';
import {Login} from './login/login';
import {Info} from './info/info';
import {loggedGuard} from '../guards/logged-guard';
import {SelezioneSupermercati} from './selezione-supermercati/selezione-supermercati';
import {MapComponent} from './map/map-component/map-component';

export const routes: Routes = [
  //{path:"",component:Homepage},
  {path:"login",component:Login},
  {path:"register",component:Register},
  {path:"map",component:MapComponent},
  {path:"info",component:Info,canActivate:[loggedGuard]},
  {path:"selectedsupermarkets",component:SelezioneSupermercati}
];

