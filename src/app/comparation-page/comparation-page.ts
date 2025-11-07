import { Component } from '@angular/core';
import {CartService} from '../../services/cart-service';
import {KeyValuePipe} from '@angular/common';
import {Product} from '../../model/Product';
import {ComparedLists} from '../../model/ComparedLists';

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
    this.fillArrays();
  }

  fillArrays()
  {
    this.serv.getSeparatedShoppingLists();
    this.serv.getComparisonLists();
    this.serv.totalsOfCart();
  }
}
