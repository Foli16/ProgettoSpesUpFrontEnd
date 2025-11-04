import { Component } from '@angular/core';
import {ShoppingList} from '../../model/ShoppingList';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../../services/cart-service';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {


  constructor(public cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartService.getCart();
  }
  loadCart() {
    this.cartService.getCart(); // chiama il service per ottenere il carrello
  }

}
