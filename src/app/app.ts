import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {Navbar} from './navbar/navbar';
import {MapComponent} from './map/map-component/map-component';
import {SelezioneSupermercati} from './selezione-supermercati/selezione-supermercati';
import {Info} from './info/info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Register, Navbar, Login, MapComponent, SelezioneSupermercati, Info],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProgettoSpesUpFrontEnd');
}
