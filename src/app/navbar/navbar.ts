import { Component } from '@angular/core';
import {BottoneCambioTema} from "../bottone-cambio-tema/bottone-cambio-tema";
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {Login} from '../login/login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    BottoneCambioTema,
    RouterLink,
    BottoneCambioTema,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(public serv:AuthService) {
  }


}
