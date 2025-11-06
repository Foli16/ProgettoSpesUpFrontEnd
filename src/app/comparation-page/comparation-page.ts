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
    this.riempiListe();
  }

  riempiListe()
  {
    this.serv.compareCart();
  }

  // dividiProdottiNeiSupermercati()
  // {
  //   let map = new Map<string,Product[]>;
  //   for(let p of this.serv.shoppingList.productList)
  //   {
  //     if(!map.has(p.supermarketName))
  //       map.set(p.supermarketName, [])
  //     map.get(p.supermarketName)!.push(p);
  //   }
  //   return Array.from(map);
  // }
}
