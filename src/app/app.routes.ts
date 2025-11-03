import { Routes } from '@angular/router';
import {Register} from './register/register';
import {Login} from './login/login';
import {Info} from './info/info';
import {loggedGuard} from '../guards/logged-guard';
import {Homepage} from './homepage/homepage';
import {MapComponent} from './map/map-component/map-component';
import {ListaProdotti} from './lista-prodotti/lista-prodotti';
import {PaginaCategoria} from './pagina-categoria/pagina-categoria';


export const routes: Routes = [
  {path:"",component:Homepage},
  {path:"login",component:Login},
  {path:"register",component:Register},
  {path:"map",component:MapComponent},
  {path:"info",component:Info,canActivate:[loggedGuard]},
  {path:"productsofsupermarket", component:ListaProdotti},
  {path:"bycategory", component:PaginaCategoria}
];

