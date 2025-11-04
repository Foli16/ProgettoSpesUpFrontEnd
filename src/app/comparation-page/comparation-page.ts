import { Component } from '@angular/core';
import {CartService} from '../../services/cart-service';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-comparation-page',
  imports: [
    KeyValuePipe
  ],
  templateUrl: './comparation-page.html',
  styleUrl: './comparation-page.css'
})
export class ComparationPage {

  constructor(public serv:CartService) {
    this.riempiListe();
  }

  riempiListe()
  {
    this.serv.compareCart();
    this.serv.getBestSupermarket();
  }
}
