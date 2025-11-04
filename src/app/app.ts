import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {Navbar} from './navbar/navbar';
import {MapComponent} from './map/map-component/map-component';
import {SelezioneSupermercati} from './selezione-supermercati/selezione-supermercati';
import {Info} from './info/info';
import {Homepage} from './homepage/homepage';
import {Cart} from './cart/cart';
import {CardProdotto} from './card-prodotto/card-prodotto';
import {CardCategoria} from './card-categoria/card-categoria';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Register, Navbar, Login, MapComponent, SelezioneSupermercati, Info, Homepage, CardProdotto, CardCategoria, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProgettoSpesUpFrontEnd');
}
